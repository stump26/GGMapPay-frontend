import React, { useState, createContext } from 'react';

const defaultContext: IMapContext = {
  center: undefined,
};

const MapContext = createContext(defaultContext);

const MapContextProvider: React.FC = ({ children }) => {
  const [mapInnerContents, setMapinnerContents] = useState<
    React.ReactElement | undefined
  >(undefined);
  const [center, setCenter] = useState<PositionType>({
    latitude: 33.450701,
    longitude: 126.570667,
  });
  const posMove = (map: any): void => {
    console.log('MapContextProvider:React.FC -> map', map);
    const newCenter = map.getCenter();
    setCenter({
      latitude: newCenter.Ha,
      longitude: newCenter.Ga,
    });
  };
  return (
    <MapContext.Provider
      value={{ center, posMove, mapInnerContents, setMapinnerContents }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContextProvider, MapContext };
