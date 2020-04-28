import { Map, Overlay } from 'kakao-map-react';
import React, { useContext, useEffect, useState } from 'react';

import { MapContext } from '~/Context/MapContext';
import Marker from '~/Components/MapMarker';
import { MarkerContext } from '~/Context/MarkerContext';
import StoreCard from '~/Components/StoreCard';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';

const MapContainer = styled(Map)`
  width: 100vw;
  height: 100vh;
`;

const KakaoMap: React.FC = () => {
  const { map, setMap, center, posMove } = useContext(MapContext);
  const { markers } = useContext(MarkerContext);
  const [overlayTarget, setOverlayTarget] = useState<IMarker>();

  const handleMarkerClick = (mark: IMarker) => {
    setOverlayTarget(mark);
  };

  return (
    <MapContainer
      id="MapContainer"
      kakaoApiKey={process.env.REACT_APP_KAKAO_JS_KEY}
      initialPosition={{
        longitude: center?.longitude,
        latitude: center?.latitude,
        level: 2,
      }}
      center={{
        longitude: center?.longitude,
        latitude: center?.latitude,
      }}
      onMapLoaded={(map: any): void => {
        setMap(map);
      }}
      onDragEnd={(map: any): void => {
        posMove && posMove(map);
      }}
    >
      {markers.map((mark) => (
        <Marker
          map={map}
          onClick={(map: any, marker: any) => {
            handleMarkerClick(mark);
          }}
          key={`marker${mark.MarkerID}`}
          pos={{
            longitude: mark.latlng.longitude,
            latitude: mark.latlng.latitude,
          }}
        />
      ))}
      {overlayTarget ? (
        <Overlay
          key={overlayTarget.MarkerID}
          longitude={overlayTarget.latlng.longitude}
          latitude={overlayTarget.latlng.latitude}
          content={renderToString(
            <StoreCard
              StoreID={overlayTarget.MarkerID}
              StoreName={overlayTarget.StoreName}
              addr={overlayTarget.addr}
              jibun={overlayTarget.jibun}
            />,
          )}
        />
      ) : (
        ''
      )}
    </MapContainer>
  );
};

export default KakaoMap;
