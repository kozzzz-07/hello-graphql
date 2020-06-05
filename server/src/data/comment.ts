const comments: Comment[] = [];
let id = 0;

/**
 * コメントを追加し、結果を返す。
 * @param content
 */
export const postComment = (content: string) => {
  const comment: Comment = { id: ++id + '', content };
  comments.push(comment);
  return comment;
};

export const getComments = () => {
  return comments;
};

export interface Comment {
  id: string;
  content: string;
}

export const COMMENT_TRIGGER = 'comment-added';
