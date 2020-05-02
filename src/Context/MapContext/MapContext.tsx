import React, { createContext, useEffect, useState } from 'react';

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
  const [clustererM, setClusterM] = useState();
  const [center, setCenter] = useState<PositionType>({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const setMapHandle = (map: any): void => {
    setMap(map);
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 0,
    });
    setClusterM(clusterer);
  };

  const posMove = (map: any): void => {
    const newCenter = map.getCenter();
    const pos: PositionType = {
      latitude: newCenter.Ha,
      longitude: newCenter.Ga,
    };
    setCenter(pos);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
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
        setMapHandle,
        center,
        posMove,
        mapInnerContents,
        setMapinnerContents,
        clustererM,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContextProvider, MapContext };
