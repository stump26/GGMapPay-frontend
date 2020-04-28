import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';

import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';

const logger = {
  log: (e: string | Error): void => console.log(e),
};

const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.ts'), {
  recursive: true,
});
const resolvers = mergeResolvers(resolversArray);

const typesArray = fileLoader(path.join(__dirname, './**/*.schema.graphql'), {
  recursive: true,
});
const typeDefs = mergeTypes(typesArray, {
  all: true,
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
});

export default schema;
