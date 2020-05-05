import React, { createContext, useState } from 'react';

const defaultContext: ILoadingContext = {
  isLoadingVisible: false,
  setLoadingVisible: undefined,
};

const LoadingContext = createContext(defaultContext);

const LoadingContextProvider: React.FC = ({ children }) => {
  const [isLoadingVisible, setLoadingVisible] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoadingVisible, setLoadingVisible }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContextProvider, LoadingContext };
