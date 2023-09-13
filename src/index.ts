import { makeExecutableSchema } from '@graphql-tools/schema';
import { usersMutations, usersQueries, usersTypes } from './users/index.js';
import { placesMutations, placesQueries, placesTypes } from './places/index.js';

export const rootValue = {
  ...usersMutations,
  ...usersQueries,
  ...placesMutations,
  ...placesQueries,
};

const typeDefs = `
${usersTypes}
${placesTypes}
`;

export const schema = makeExecutableSchema({ typeDefs });
