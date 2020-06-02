import { modHello, Hello, HelloInput } from '../data/hello';

export default {
  hello: (parent: unknown, { helloInput }: HelloInput): Hello => {
    return modHello(helloInput);
  },
};
