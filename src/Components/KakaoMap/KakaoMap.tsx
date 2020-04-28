import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Map } from 'kakao-map-react';
import { MapContext } from '~/Context/MapContext';
import { MarkerContext } from '~/Context/MarkerContext';

const MapContainer = styled(Map)`
  width: 100vw;
  height: 100vh;
`;

const KakaoMap: React.FC = () => {
  const { center, mapInnerContents, posMove } = useContext(MapContext);
  const { renderMarkers } = useContext(MarkerContext);
  console.log('KakaoMap:React.FC -> center', center);
  return (
    <MapContainer
      id="MapContainer"
      kakaoApiKey={process.env.REACT_APP_KAKAO_JS_KEY}
      initialPosition={{
        longitude: center?.longitude,
        latitude: center?.latitude,
        level: 3,
      }}
      center={{ center }}
      onDragEnd={(map: any): void => {
        posMove && posMove(map);
      }}
    >
      {mapInnerContents && mapInnerContents}
    </MapContainer>
  );
};

export default KakaoMap;
