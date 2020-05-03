import React, { useContext, useState } from 'react';

import { MapContext } from '~/Context/MapContext';

type EventList =
  | 'onClick'
  | 'onMouseOver'
  | 'onMouseOut'
  | 'onRightClick'
  | 'onDragStart'
  | 'onDragEnd';
type Events = {
  [key: string]: string;
};

interface IMarkerProps {
  map: any;
  pos: PositionType;
  image?: string;
  onClick?: any;
  onMouseOver?: any;
  onMouseOut?: any;
  onRightClick?: any;
  onDragStart?: any;
  onDragEnd?: any;
  onClustererClick?: any;
  onClusterOver?: any;
  onClusterOut?: any;
  onClusterDoubleClick?: any;
  onClusterRightClick?: any;
  onClustered?: any;
}

const allMarkerEvents: Events = {
  onClick: 'click',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onRightClick: 'rightclick',
  onDragStart: 'dragstart',
  onDragEnd: 'dragend',
};
const clusterMarkerEvents: Events = {
  onClustererClick: 'clusterclick',
  onClusterOver: 'clusterover',
  onClusterOut: 'clusterout',
  onClusterDoubleClick: 'clusterdblclick',
  onClusterRightClick: 'clusterrightclick',
  onClustered: 'clustered',
};

interface IMarkerEvent {
  target: any;
  type: string;
  handler: any;
}
const Marker: React.FC<IMarkerProps> = (props) => {
  const [isDrawn, updateIsDrawn] = useState(false);
  const { clustererM } = useContext(MapContext);
  const { map, pos } = props;
  const { kakao } = window;

  React.useEffect(() => {
    const position = new kakao.maps.LatLng(pos.latitude, pos.longitude);

    const marker = new kakao.maps.Marker({
      map,
      position,
    });

    const events: IMarkerEvent[] = [];

    if (map && !isDrawn) {
      updateIsDrawn(true);

      // marker.setMap(map);
      clustererM && clustererM.addMarker(marker);

      // set Marker Events
      for (let [key, value] of Object.entries(allMarkerEvents)) {
        if (props.hasOwnProperty(key)) {
          kakao.maps.event.addListener(marker, value, () => {
            const handler = props[key as EventList](map, marker);
            events.push({
              target: map,
              type: value,
              handler,
            });
            return handler;
          });
        }
      }

      // set ClusterMarker Events
      for (let [key, value] of Object.entries(clusterMarkerEvents)) {
        if (props.hasOwnProperty(key)) {
          kakao.maps.event.addListener(clustererM, value, (cluster: any) => {
            const handler = props[key as EventList](cluster);
            events.push({
              target: map,
              type: value,
              handler,
            });
            return handler;
          });
        }
      }

      return () => {
        // marker.setMap(null);
        clustererM && clustererM.clear();
        events.map((event) => {
          kakao.maps.event.removeListener(
            event.target,
            event.type,
            event.handler,
          );
        });
      };
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return <div />;
};

export default Marker;
