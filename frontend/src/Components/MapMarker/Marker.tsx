import React, { useCallback } from 'react';

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
}

const allEvents: Events = {
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
const Marker: React.FC<IMarkerProps> = (props) => {
  const [isDrawn, updateIsDrawn] = React.useState(false);
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

      marker.setMap(map);

      for (let [key, value] of Object.entries(allEvents)) {
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

      return () => {
        marker.setMap(null);
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
