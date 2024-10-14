import { makeExecutableSchema } from '@graphql-tools/schema';
import { usersMutations, usersQueries, usersTypes } from '@users';
import { placesMutations, placesQueries, placesTypes } from '@places';

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
