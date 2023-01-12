import { CommentServices } from "../services/commentService";
export class CommentController {
  static async createComment(req, res) {
    try {
      const { message } = req.body;
      const comment = {
        name: res.locals.name,
        email: res.locals.email,
        message,
        date: new Date(),
      };
      const response = await CommentServices.createComment(
        comment,
        req.params.id
      );
      res.status(200).json({ CommentedBlog: response.data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
  static async viewComments(req, res) {
    try {
      const comments = await CommentServices.viewComments(req.params.id);
      res.status(200).json({ comments });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "No comments found" });
    }
  }

  static async viewSingleComment(req, res) {
    try {
      const comment = await CommentServices.viewSingleComment(
        req.params.bid,
        req.params.cid
      );
      if (comment == "Not found") {
        return res.status(404).json({ Error: "Comment not found" });
      }
      return res.status(200).json({ comment });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error });
    }
  }

  static async deleteComment(req, res) {
    try {
      await CommentServices.deleteComment(req.params.bid, req.params.cid);
      res.status(204).json({ message: "Comment Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}
