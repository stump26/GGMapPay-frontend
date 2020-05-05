import { Map, Overlay } from 'kakao-map-react';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { GET_AROUND_CENTER_QUERY } from '~/graphql/querys';
import { MapContext } from '~/Context/MapContext';
import { MarkerContext } from '~/Context/MarkerContext';
import Markers from '~/Components/MapMarkers';
import { ModalContext } from '~/Context/ModalContext';
import StoreCard from '~/Components/StoreCard';
import StoreList from '~/Components/StoreList';
import { onewayID } from '~/utils/hashid';
import { renderToString } from 'react-dom/server';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';

const MapContainer = styled(Map)`
  width: 100vw;
  height: 100vh;
`;

const KakaoMap: React.FC = () => {
  const { map, setMapHandle, center, posMove, clustererM } = useContext(MapContext);
  const { markers, setMarkers } = useContext(MarkerContext);
  const { setModalVisible, updateModalContent } = useContext(ModalContext);
  const [overlayTarget, setOverlayTarget] = useState<IMarker>();
  const [getAround] = useLazyQuery(GET_AROUND_CENTER_QUERY, {
    onCompleted: async (data) => {
      const transformed = await data.getAroundStore.reduce((acc: Array<IMarker>, cur: any) => {
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
      }, []);
      setMarkers(transformed);
    },
  });

  const clusterClickHandler = useCallback(
    (cluster: any) => {
      const markers = cluster._markers as Array<any>;
      if (markers) {
        const markInfos = markers?.map((mark) => mark.info) as Array<IMarker>;
        setModalVisible && setModalVisible(true);
        const Element = <StoreList title="Store List" datas={markInfos} />;
        updateModalContent(Element);
      }
    },
    [setModalVisible, updateModalContent],
  );

  useEffect(() => {
    if (center) {
      getAround({
        variables: { lat: center.latitude, long: center.longitude },
      });
    }
    if (clustererM) {
      window.kakao.maps.event?.addListener(clustererM, 'clusterclick', clusterClickHandler);
    }
    return () => {
      if (clustererM) {
        window.kakao.maps.event.removeListener(clustererM, 'clusterclick', clusterClickHandler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, clustererM]);

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
      onMapLoaded={setMapHandle}
      onDragEnd={posMove}
      onDragStart={(map: any): void => {
        setOverlayTarget(undefined);
      }}
    >
      <Markers
        map={map}
        data={markers}
        onClick={(mark: IMarker) => {
          handleMarkerClick(mark);
        }}
      />
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
