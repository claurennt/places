import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import * as dotenv from 'dotenv';
dotenv.config();

import sanitizedConfig from './config';

import './db/connect';

import { rootValue, schema } from './schema';

const { PORT } = sanitizedConfig;

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
