import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommentQuery, Comment } from '../../shared/gql';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';

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

  constructor(private router: Router, private roomService: RoomService) {
    const navigation = this.router.getCurrentNavigation();
    this.name = navigation?.extras?.state?.name || '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchComments();
    this.subscribeComments();
  }

  private fetchComments() {
    this.subscription.add(
      this.roomService
        .fetchComments()
        .subscribe((result: ApolloQueryResult<CommentQuery>) => {
          console.log(result);
          this.comments = [...result.data.comments];
        }),
    );
  }

  onClickEntry(message: string) {
    if (!message) {
      return;
    }

    this.subscription.add(
      this.roomService.postComment(this.name, message).subscribe(
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

  private subscribeComments() {
    this.subscription.add(
      this.roomService.subscribeComments().subscribe(
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
