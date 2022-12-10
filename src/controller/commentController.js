import { CommentServices } from "../services/commentService";
export class CommentController {
  static async createComment(req, res) {
    try {
      const { name, email, message } = req.body;
      const comment = {
        name,
        email,
        message,
      };
      const response = await CommentServices.createComment(
        comment,
        req.params.id
      );
      if (response.type == "error") {
        res.status(400).json({ error: response.data });
      } else {
        res.status(200).json({ CommentedBlog: response.data });
      }
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
      res.status(200).json({ comment });
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error });
    }
  }

  static async deleteComment(req, res) {
    try {
      await commentServices.deleteComment(req.params.bid, req.params.cid);
      res.status(200).json({ message: "Comment Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}
