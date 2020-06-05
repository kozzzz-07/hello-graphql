import { ApolloServer, PubSub } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import * as express from 'express';
import * as cors from 'cors';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Query, Mutation, Subscription, Type } from './resolvers/';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

try {
  const resolvers = { Query, Mutation, Subscription, ...Type };
  const typeDefs = readFileSync('./src/typeDefs.graphql', 'utf-8');
  const pubSub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: true,
    context: () => {
      return { pubSub };
    },
    introspection: true,
    uploads: false,
    debug: true,
  });
  const app = express();

  const PORT = process.env.PORT || 8080;

  app.use(cors());

  // bodyParserを有効
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  server.applyMiddleware({ app });

  app.use('*', cors({ origin: `http://localhost:${PORT}` }));

  app.get(
    `/playground`,
    expressPlayground({
      endpoint: `/graphql`,
      // subscriptionEndpoint: `/graphql`,
    }),
  );
  app.get(`/*`, (req, res) => res.redirect('/playground'));

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  httpServer.listen(PORT, () => {
    console.log(`GraphQL Service running @ :${PORT}${server.graphqlPath}`);
    console.log(`Subscriptions ready at @ :${PORT}${server.subscriptionsPath}`);

    // Set up the WebSocket for handling GraphQL subscriptions
    const hoge = SubscriptionServer.create(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: httpServer,
        path: '/graphql',
        noServer: true,
      },
    );
  });
} catch (error) {
  console.error(error);
}
