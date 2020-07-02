import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  COMMENTS_QUERY,
  COMMENT_POST,
  COMMENTS_SUBSCRIPTION,
} from '../shared/gql';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private apollo: Apollo) {}

  fetchComments() {
    return this.apollo.watchQuery<any>({
      query: COMMENTS_QUERY,
      fetchPolicy: 'no-cache',
    }).valueChanges;
  }

  postComment(name: string, message: string) {
    return this.apollo.mutate<any>({
      mutation: COMMENT_POST,
      variables: {
        name,
        content: message,
      },
    });
  }

  subscribeComments() {
    return this.apollo.subscribe<any>({
      query: COMMENTS_SUBSCRIPTION,
      fetchPolicy: 'no-cache',
    });
  }
}
