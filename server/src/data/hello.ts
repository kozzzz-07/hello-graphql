export let hello: Hello = 'Hello World!';

/**
 * Helloを変更し、結果を返す。
 */
export const modHello = (_hello: Hello): Hello => {
  hello = _hello;
  return hello;
};

export type Hello = string;

export interface HelloInput {
  helloInput: Hello;
}
