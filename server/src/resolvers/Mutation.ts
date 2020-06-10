import { modHello, Hello, HelloInput } from '../data/hello';
import {
  postComment,
  COMMENT_TRIGGER,
  getComments,
  PostComment,
} from '../data/comment';
import { PubSub } from 'apollo-server-express';

export default {
  hello: (parent: unknown, { helloInput }: HelloInput): Hello => {
    return modHello(helloInput);
  },
  postComment: (
    parent: unknown,
    { name = 'no name', content }: PostComment,
    { pubSub }: { pubSub: PubSub },
  ) => {
    const comment = postComment({ name, content });
    // const comments = getComments();
    pubSub.publish(COMMENT_TRIGGER, { commentAdded: comment });
    return comment;
  },
};
