import ApolloClient from './graphql/ApolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import { MapContextProvider } from '~/Context/MapContext';
import { MarkerContextProvider } from '~/Context/MarkerContext';
import { ModalContextProvider } from '~/Context/ModalContext';
import React from 'react';

const Provider: React.FC = ({ children }) => {
  return (
    <>
      <ApolloProvider client={ApolloClient}>
        <MapContextProvider>
          <MarkerContextProvider>
            <ModalContextProvider>{children}</ModalContextProvider>
          </MarkerContextProvider>
        </MapContextProvider>
      </ApolloProvider>
    </>
  );
};

export default Provider;
