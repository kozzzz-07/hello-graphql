import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import * as express from 'express';
import * as cors from 'cors';
import { readFileSync } from 'fs';
import { Query, Type } from './resolvers/';

try {
  const resolvers = { Query, ...Type };
  const typeDefs = readFileSync('./src/typeDefs.graphql', 'utf-8');
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    debug: true,
  });
  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });
  app.get(`/playground`, expressPlayground({ endpoint: `/graphql` }));
  app.get(`/*`, (req, res) => res.redirect('/playground'));
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () =>
    console.log(`GraphQL Service running @ :${PORT}${server.graphqlPath}`),
  );
} catch (error) {
  console.error(error);
}
