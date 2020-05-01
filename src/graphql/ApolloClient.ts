import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

let uri = `${process.env.REACT_APP_BACKEND_URI}/graphql`;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

export default client;
