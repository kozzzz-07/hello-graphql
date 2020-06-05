import { PubSub } from 'graphql-subscriptions';
import { COMMENT_TRIGGER } from '../data/comment';

export default {
  commentAdded: {
    subscribe: (
      parent: unknown,
      args: unknown,
      { pubSub }: { pubSub: PubSub },
    ) => {
      pubSub.asyncIterator([COMMENT_TRIGGER]);
    },
  },
};
