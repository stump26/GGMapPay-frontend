import React, { useEffect, useState, createContext } from 'react';

const defaultContext: IMapContext = {
  map: undefined,
  center: undefined,
};

const MapContext = createContext(defaultContext);

const MapContextProvider: React.FC = ({ children }) => {
  const [map, setMap] = useState<any>(undefined);
  const [center, setCenter] = useState<PositionType>({
    lat: 33.450701,
    long: 126.570667,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setCenter({
        long: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  }, []);

  const posMove = (pos: PositionType): void => {
    console.log(pos);
  };
  return (
    <MapContext.Provider value={{ map, center, posMove, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export { MapContextProvider, MapContext };
