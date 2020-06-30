import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import {
  COMMENTS_SUBSCRIPTION,
  COMMENT_POST,
  COMMENTS_QUERY,
  CommentQuery,
  Comment,
} from '../../shared/gql';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
  name: string;
  message: string;
  subscription = new Subscription();
  comments: Comment[] = [];

  constructor(private router: Router, private apollo: Apollo) {
    // this.router.events
    //   .pipe(filter(e => e instanceof NavigationStart))
    //   .subscribe(e => {
    //     const navigation = this.router.getCurrentNavigation();
    //     this.name = navigation?.extras?.state?.name || '';
    //     console.log({ navigation });
    //   });

    const navigation = this.router.getCurrentNavigation();
    this.name = navigation?.extras?.state?.name || '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchComment();
    this.subscribeComment();
  }

  private fetchComment() {
    this.subscription.add(
      this.apollo
        .watchQuery<any>({
          query: COMMENTS_QUERY,
        })
        .valueChanges.subscribe((result: ApolloQueryResult<CommentQuery>) => {
          console.log(result);
          this.comments = [...result.data.comments];
        }),
    );
  }

  onClickEntry(message: string) {
    if (!message) {
      return;
    }

    console.log(this.name);

    this.subscription.add(
      this.apollo
        .mutate<any>({
          mutation: COMMENT_POST,
          variables: {
            name: this.name,
            content: message,
          },
        })
        .subscribe(
          ({ data }) => {
            console.log('got data', data);
          },
          error => {
            console.error('there was an error sending the query', error);
          },
        ),
    );

    this.message = '';
  }

  private subscribeComment() {
    this.subscription.add(
      this.apollo
        .subscribe<any>({
          query: COMMENTS_SUBSCRIPTION,
          fetchPolicy: 'no-cache',
        })
        .subscribe(
          (result: ApolloQueryResult<any>) => {
            console.log(result);
            this.comments.push(result.data.commentAdded);
          },
          (error: any) => {
            console.error(error);
          },
        ),
    );
  }
}
