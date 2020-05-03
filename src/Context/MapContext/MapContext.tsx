import React, { createContext, useCallback, useEffect, useState } from 'react';

import { useBetterCallback } from '~/utils/Hooks';

const defaultContext: IMapContext = {
  map: undefined,
  center: undefined,
};

const MapContext = createContext(defaultContext);

function calcDistance(start: PositionType, dest: PositionType) {
  function degreesToRadians(degrees: number) {
    const radians = (degrees * Math.PI) / 180;
    return radians;
  }
  var startLatRads = degreesToRadians(start.latitude);
  var startLongRads = degreesToRadians(start.longitude);
  var destLatRads = degreesToRadians(dest.latitude);
  var destLongRads = degreesToRadians(dest.longitude);

  var Radius = 6371; //지구의 반경(km)
  var distance =
    Math.acos(
      Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads),
    ) * Radius;

  return distance * 1000;
}

const MapContextProvider: React.FC = ({ children }) => {
  const [map, setMap] = useState();
  const [mapInnerContents, setMapinnerContents] = useState<React.ReactElement | undefined>(
    undefined,
  );
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

  const posMove = useBetterCallback(
    (map: any, [center]: any): void => {
      const newCenter = map.getCenter();
      const newPos: PositionType = {
        latitude: newCenter.Ha,
        longitude: newCenter.Ga,
      };
      const distance = calcDistance(center, newPos);
      console.log('MapContextProvider:React.FC -> distance', distance);
      if (distance > 450) {
        setCenter(newPos);
      }
    },
    [center],
  );

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
