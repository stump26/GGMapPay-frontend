import './index.css';

import * as serviceWorker from './serviceWorker';

import ApolloClient from './graphql/ApolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import { MapContextProvider } from '~/Context/MapContext';
import { MarkerContextProvider } from '~/Context/MarkerContext';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ApolloClient}>
      <MapContextProvider>
        <MarkerContextProvider>
          <App />
        </MarkerContextProvider>
      </MapContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
