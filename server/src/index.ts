import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import * as express from 'express';
import { readFileSync } from 'fs';
import { Query, Type } from './resolvers/';

try {
  const resolvers = { Query, ...Type };
  const typeDefs = readFileSync('./src/typeDefs.graphql', 'utf-8');
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  server.applyMiddleware({ app });
  app.get(`/playground`, expressPlayground({ endpoint: `/graphql` }));
  app.listen({ port: 4000 }, () =>
    console.log(`Now browse to http://localhost:4000'${server.graphqlPath}`),
  );
} catch (error) {
  console.error(error);
}
