import { IResolvers, gql, makeExecutableSchema } from 'apollo-server-express';

import merge from 'lodash/merge';
import store from './Store';

const typeDef = gql`
  scalar JSON
  scalar Date
  type Query {
    _version: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    _version: () => '1.0',
  },
  // Mutation: {},
};

const schema = makeExecutableSchema({
  typeDefs: [typeDef, store.typeDef],
  resolvers: merge(resolvers, store.resolvers),
});

export default schema;
