import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getPostCommentsHandler = function(schema, request){
  const postId = request.params.postId;
  try{
    const post = schema.posts.findBy({ _id: postId }).attrs;
    return new Response(200, {}, {comments: post.comments});
  }catch(error){
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }

}

export const addCommentToPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
  const postId = request.params.postId;
  const {commentData} =  JSON.parse(request.requestBody);
  const comment = {
    id: uuid(),
    text: commentData,
    username: user.username,
    votes: { upvotedBy: [], downvotedBy: [] },
    createdAt: formatDate(),
    updatedAt: formatDate()
  };
  let post = schema.posts.findBy({ _id: postId }).attrs;
  post.comments.push(comment);
  this.db.posts.update({ _id: postId }, post);
  return new Response(201, {}, { posts : this.db.posts });
  }catch(error){
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
}