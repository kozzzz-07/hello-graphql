import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { environment } from 'src/environments/environment';

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // Create an http link:
    const http = httpLink.create({
      uri: `${environment.httpProtocol}${environment.domain}/graphql`,
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `${environment.wsUri}/subscription`,
      options: {
        reconnect: true,
      },
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      ws,
      http,
    );

    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
