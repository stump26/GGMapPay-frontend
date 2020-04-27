import React, { createContext, useState } from 'react';

const defaultContext: IMarkerContext = {
  markers: [],
};
const MarkerContext = createContext(defaultContext);

const dumi: Array<IMarker> = [
  {
    title: 'marker 1',
    latlng: new window.kakao.maps.LatLng(
      37.166050180066904,
      127.10766991777132,
    ),
  },
  {
    title: 'marker 2',
    latlng: new window.kakao.maps.LatLng(37.16622676990602, 127.1207756820257),
  },
  {
    title: 'marker 3',
    latlng: new window.kakao.maps.LatLng(37.16156972968593, 127.11006158957623),
  },
];

const MarkerContextProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = useState<Array<IMarker>>(dumi);

  const renderMarkers = (map: any): void => {
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    // 마커 이미지의 이미지 크기 입니다
    const imageSize = new window.kakao.maps.Size(24, 35);
    // 마커 이미지를 생성합니다
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    markers.map((m) => {
      const marker = new window.kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: m.latlng, // 마커를 표시할 위치
        title: m.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    });
  };
  return (
    <MarkerContext.Provider value={{ markers, renderMarkers }}>
      {children}
    </MarkerContext.Provider>
  );
};

export { MarkerContextProvider, MarkerContext };
