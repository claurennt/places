import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';
import * as dotenv from 'dotenv';
dotenv.config();

import sanitizedConfig from './config';

import './db/connect';

import { rootValue, schema } from './schema';

const { PORT } = sanitizedConfig;

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue,
  })
);
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(PORT);

console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
console.log(`GraphQL playground at http://localhost:${PORT}/playground `);
