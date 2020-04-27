import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { MapContext } from '~/Context/MapContext';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const KakaoMap: React.FC = () => {
  const { setMap, center, posMove } = useContext(MapContext);
  useEffect(() => {
    const mapContainer = document.getElementById('MapContainer');
    const mapOption = {
      center: new window.kakao.maps.LatLng(center?.lat, center?.long), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    setMap && setMap(map);

    window.kakao.maps.event.addListener(map, 'dragend', () => {
      const latlng = map.getCenter();
      const curPos: PositionType = {
        lat: latlng.getLat() as number,
        long: latlng.getLng() as number,
      };
      posMove && posMove(curPos);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  return <MapContainer id="MapContainer" />;
};

export default KakaoMap;
