import { LikeServices } from "../services/likeService";
export class LikeController {
  static async like(req, res) {
    try {
      const response = await LikeServices.like(req.params.id, res.locals.email);
       res.status(200).json({ likedBlog: response.data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}
