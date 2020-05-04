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
  data: Array<IMarker>;
  onClick?: any;
  onMouseOver?: any;
  onMouseOut?: any;
  onRightClick?: any;
  onDragStart?: any;
  onDragEnd?: any;
}

const allMarkerEvents: Events = {
  onClick: 'click',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onRightClick: 'rightclick',
  onDragStart: 'dragstart',
  onDragEnd: 'dragend',
};

interface IMarkerEvent {
  target: any;
  type: string;
  handler: any;
}

const Markers: React.FC<IMarkerProps> = (props) => {
  const { clustererM } = useContext<IMapContext>(MapContext);
  const { map, data: markers } = props;
  const { kakao } = window;

  React.useEffect(() => {
    const events: IMarkerEvent[] = [];
    markers.map((mark) => {
      const position = new kakao.maps.LatLng(mark.latlng.latitude, mark.latlng.longitude);

      if (map && markers && markers.length > 0) {
        const marker = new kakao.maps.Marker({
          map,
          position,
        });
        marker['info'] = { ...mark };
        // set Marker Events
        for (let [key, value] of Object.entries(allMarkerEvents)) {
          if (props.hasOwnProperty(key)) {
            kakao.maps.event.addListener(marker, value, () => {
              const handler = props[key as EventList](mark);
              events.push({
                target: map,
                type: value,
                handler,
              });
              return handler;
            });
          }
        }

        clustererM && clustererM.addMarker(marker);
      }
    });

    return () => {
      clustererM && clustererM.clear();
      events.map((event): void => {
        kakao.maps.event.removeListener(event.target, event.type, event.handler);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, clustererM]);

  return null;
};

export default Markers;
