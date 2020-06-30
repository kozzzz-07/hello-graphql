import gql from 'graphql-tag';

export interface CommentQuery {
  comments: Comment[];
}

export interface Comment {
  id: string;
  name: string;
  content: string;
  createAt: string;
}

export const COMMENTS_QUERY = gql`
  query Comments {
    comments {
      id
      name
      content
      createAt
    }
  }
`;

export const COMMENT_POST = gql`
  mutation Comment($name: String!, $content: String!) {
    postComment(name: $name, content: $content) {
      name
      content
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription CommentAdded {
    commentAdded {
      id
      name
      content
      createAt
    }
  }
`;
