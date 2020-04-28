import React, { useEffect, useState, createContext } from 'react';

const defaultContext: IMapContext = {
  map: undefined,
  center: undefined,
};

const MapContext = createContext(defaultContext);

const MapContextProvider: React.FC = ({ children }) => {
  const [map, setMap] = useState();
  const [mapInnerContents, setMapinnerContents] = useState<
    React.ReactElement | undefined
  >(undefined);
  const [center, setCenter] = useState<PositionType>({
    latitude: 33.450701,
    longitude: 126.570667,
  });
  const posMove = (map: any): void => {
    const newCenter = map.getCenter();
    setCenter({
      latitude: newCenter.Ha,
      longitude: newCenter.Ga,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setCenter({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);
  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        center,
        posMove,
        mapInnerContents,
        setMapinnerContents,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContextProvider, MapContext };
