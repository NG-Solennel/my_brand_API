import Blog from "../model/Blog";
import validateLikes from "../validations/like_validations";
import { BlogServices } from "./blogService";
import User from "../model/User";
export class LikeServices {
  static async like(id, email) {
    const blog = await Blog.findOne({ _id: id });
    if (blog.likes.People.includes(email) == true) {
      let c = blog.likes.Count - 1;
      let b = blog.likes.People.filter((p) => p !== email);
      await Blog.findOneAndUpdate(
        { _id: id },
        { likes: { Count: c, People: b } }
      );
    } else {
      let a = blog.likes.Count + 1;
      let p = blog.likes.People;
      p.push(email);
      await Blog.findOneAndUpdate(
        { _id: id },
        { likes: { Count: a, People: p } }
      );
    }

    const likedBlog = await Blog.findOne({ _id: id });

    return { type: "response", data: likedBlog };
  
  }
}
