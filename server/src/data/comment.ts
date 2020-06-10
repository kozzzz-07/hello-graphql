let comments: Comment[] = [];
let id = 0;

/**
 * コメントを追加し、結果を返す。
 * @param content
 */
export const postComment = ({ name, content }: PostComment) => {
  const comment: Comment = {
    id: ++id + '',
    name,
    content,
    createAt: new Date(),
  };
  comments.push(comment);
  comments = comments.slice(-1000); // 上限数
  return comment;
};

export const getComments = () => {
  return comments;
};

export interface Comment {
  id: string;
  name: string;
  content: string;
  createAt: Date;
}

export interface PostComment {
  name?: string;
  content: string;
}

export const COMMENT_TRIGGER = 'comment-added';
