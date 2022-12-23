import express from "express";
import { CommentController } from "../../controller/commentController";
import { commentValidation } from "../../middleware/auth/validations";
import commentAuth from "../../middleware/auth/likeCommentAuth";
const route = express.Router();

route.post(
  "/:id/comments",
  commentValidation,
  commentAuth,
  CommentController.createComment
);
route.get("/:id/comments", CommentController.viewComments);
route.get("/:bid/comments/:cid", CommentController.viewSingleComment);
route.delete("/:bid/comments/:cid", CommentController.deleteComment);
export default route;
