import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent implements OnInit {
  hello: string;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            hello
          }
        `,
      })
      .valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        console.log(result);
        this.hello = result?.data?.hello;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
