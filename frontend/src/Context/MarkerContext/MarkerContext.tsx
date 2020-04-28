import React, { createContext, useState } from 'react';

import { produce } from 'immer';
import { renderToString } from 'react-dom/server';

const defaultContext: IMarkerContext = {
  markers: [],
};
const MarkerContext = createContext(defaultContext);

const dumi: Array<IMarker> = [
  {
    MarkerID: 12345,
    StoreName: 'marker 1',
    addr: '경기도 화성시 장지안길 1',
    jibun: '18510, 경기도 화성시 장지8동',
    latlng: {
      latitude: 37.166050180066904,
      longitude: 127.10766991777132,
    },
  },
  {
    MarkerID: 22345,
    StoreName: 'marker 2',
    addr: '경기도 화성시 장지안길 1',
    jibun: '18510, 경기도 화성시 장지8동',
    latlng: {
      latitude: 37.16622676990602,
      longitude: 127.1207756820257,
    },
  },
  {
    MarkerID: 32345,
    StoreName: 'marker 3',
    addr: '경기도 화성시 장지안길 1',
    jibun: '18510, 경기도 화성시 장지8동',
    latlng: {
      latitude: 37.16156972968593,
      longitude: 127.11006158957623,
    },
  },
];

const MarkerContextProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = useState<Array<IMarker>>(dumi);
  const [markerOverlays, setMarkerOverlays] = useState();
  return (
    <MarkerContext.Provider value={{ markers }}>
      {children}
    </MarkerContext.Provider>
  );
};

export { MarkerContextProvider, MarkerContext };
