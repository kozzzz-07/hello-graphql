import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent implements OnInit, OnDestroy {
  hello: string;
  pokemons: Pokemon[];
  comments: string[] = [];
  loading = true;
  error: any;

  private helloSubscription: Subscription;
  private pokemonSubscription: Subscription;
  private commentSubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.setHello();
    this.setPokemon();
    this.subscribeComment();
  }

  private setHello() {
    this.helloSubscription = this.apollo
      .watchQuery<any>({
        query: helloGql,
      })
      .valueChanges.subscribe((result: ApolloQueryResult<any>) => {
        console.log(result);
        this.hello = result?.data?.hello;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }

  onClick(helloInput: string) {
    this.apollo
      .mutate<{ hello: string }>({
        mutation: mutationHello,
        variables: {
          helloInput,
        },
      })
      .subscribe(
        ({ data }) => {
          this.hello = data ? data.hello : '';
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  private setPokemon() {
    this.pokemonSubscription = this.apollo
      .watchQuery<any>({
        query: pokemonGql,
        variables: {
          types: ['ほのお', 'じめん'],
        },
      })
      .valueChanges.subscribe(
        (result: ApolloQueryResult<PokemonQueryResult>) => {
          console.log(result);
          this.pokemons = result?.data?.allPokemon;
          this.loading = result.loading;
          this.error = result.errors;
        },
      );
  }

  subscribeComment() {
    this.commentSubscription = this.apollo
      .subscribe<any>({
        query: COMMENTS_SUBSCRIPTION,
        fetchPolicy: 'no-cache',
      })
      .subscribe(
        (result: ApolloQueryResult<any>) => {
          console.log(result);
          this.comments.push(result.data.commentAdded.content);
        },
        (error: any) => {
          console.error(error);
        },
      );
  }

  onClickComment(comment: string) {
    this.apollo
      .mutate<{ hello: string }>({
        mutation: COMMENT_QUERY,
        variables: {
          content: comment,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  ngOnDestroy() {
    this.helloSubscription.unsubscribe();
    this.pokemonSubscription.unsubscribe();
    this.commentSubscription.unsubscribe();
  }
}

const helloGql = gql`
  {
    hello
  }
`;

const mutationHello = gql`
  mutation mutationHello($helloInput: String!) {
    hello(helloInput: $helloInput)
  }
`;

const pokemonGql = gql`
  query pokemonGql($types: [String!]!) {
    allPokemon(types: $types) {
      name
      types
    }
  }
`;

const COMMENT_QUERY = gql`
  mutation Comment($content: String!) {
    postComment(content: $content) {
      id
      content
    }
  }
`;

const COMMENTS_SUBSCRIPTION = gql`
  subscription sb {
    commentAdded {
      id
      content
    }
  }
`;

interface PokemonQueryResult {
  allPokemon: Pokemon[];
}

interface Pokemon {
  no?: number;
  name?: string;
  form?: string;
  isMegaEvolution?: boolean;
  evolutions?: number[];
  types?: string[];
  abilities?: string[];
  hiddenAbilities?: string[];
  stats?: Stats;
}

interface Stats {
  hp?: number;
  attack?: number;
  defence?: number;
  spAttack?: number;
  spDefence?: number;
  speed?: number;
}
