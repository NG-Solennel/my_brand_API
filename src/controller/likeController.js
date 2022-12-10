import { LikeServices } from "../services/likeService";
export class LikeController {
  static async like(req, res) {
    try {
      const response = await LikeServices.like(req.params.id, res.locals.email);
      if (response.type == "error") {
        return res.status(400).json({ ValidationError: response.data });
      } else if (response.type == "response") {
        res.status(200).json({ likedBlog: response.data });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}
