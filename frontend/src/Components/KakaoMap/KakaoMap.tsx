import { Map, Overlay } from 'kakao-map-react';
import React, { useContext, useEffect, useState } from 'react';

import { GET_AROUND_CENTER_QUERY } from '~/graphql/api';
import { MapContext } from '~/Context/MapContext';
import Marker from '~/Components/MapMarker';
import { MarkerContext } from '~/Context/MarkerContext';
import StoreCard from '~/Components/StoreCard';
import { onewayID } from '~/utils/hashid';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';

const MapContainer = styled(Map)`
  width: 100vw;
  height: 100vh;
`;

const KakaoMap: React.FC = () => {
  const { map, setMap, center, posMove } = useContext(MapContext);
  const { markers, setMarkers } = useContext(MarkerContext);
  const [overlayTarget, setOverlayTarget] = useState<IMarker>();
  const [getAround] = useLazyQuery(GET_AROUND_CENTER_QUERY, {
    onCompleted: (data) => {
      const transformed = data.getAroundStore.reduce(
        (acc: Array<IMarker>, cur: any) => {
          console.log('KakaoMap:React.FC -> cur', cur);
          const newobj: IMarker = {
            MarkerID: onewayID(7),
            StoreName: cur.CMPNM_NM,
            addr: cur.REFINE_ROADNM_ADDR,
            jibun: cur.REFINE_LOTNO_ADDR,
            telno: cur.TELNO,
            latlng: {
              latitude: cur.REFINE_WGS84_LAT,
              longitude: cur.REFINE_WGS84_LOGT,
            },
          };
          return [...acc, newobj];
        },
        [],
      );
      setMarkers(transformed);
    },
  });

  useEffect(() => {
    if (center) {
      getAround({
        variables: { lat: center.latitude, long: center.longitude },
      });
    }
  }, [center]);

  const handleMarkerClick = (mark: IMarker) => {
    setOverlayTarget(mark);
  };

  console.log('KakaoMap:React.FC -> markers', markers);
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
      {markers?.map((mark) => (
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
