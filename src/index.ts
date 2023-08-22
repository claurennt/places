import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createUser, deleteUser, usersTypes } from './users/index.js';
import { placesTypes } from './places/index.js';

export const rootValue = {
  createUser,
  deleteUser,
};

const typeDefs = `
${usersTypes}
${placesTypes}
`;

export const schema = makeExecutableSchema({ typeDefs });
