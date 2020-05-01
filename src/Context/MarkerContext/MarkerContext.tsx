import React, { createContext, useState } from 'react';

const defaultContext: IMarkerContext = {
  markers: [],
  setMarkers: undefined,
};
const MarkerContext = createContext(defaultContext);

const dumi: Array<IMarker> = [];

const MarkerContextProvider: React.FC = ({ children }) => {
  const [markers, setMarkers] = useState<Array<IMarker>>(dumi);

  return (
    <MarkerContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MarkerContext.Provider>
  );
};

export { MarkerContextProvider, MarkerContext };
