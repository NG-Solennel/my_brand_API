import Blog from "../model/Blog";
import { BlogServices } from "../services/blogService";
import cloudinary from "../utils/cloudinary";
export class BlogController {
  static async createBlog(req, res) {
    const { title, content, image } = req.body;
    try {
      const imgResult = await cloudinary.uploader.upload(image, {
        folder: "my_brand_andela",
      });

      const data = {
        title,
        content,
        image: {
          public_id: imgResult.public_id,
          url: imgResult.secure_url,
        },
      };

      const response = await BlogServices.createBlog(data);
      if (response.type == "error") {
        return res.status(409).json({ error: response.data });
      } else {
        return res.status(200).json({ CreatedBlog: response.data });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async viewBlogs(req, res) {
    try {
      const blogs = await BlogServices.viewBlogs();
      if (blogs.length == 0) {
        return res.status(200).json({ Message: "No blogs available" });
      }
      return res.status(200).json({ blogs });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async viewSingleBlog(req, res) {
    try {
      const blog = await BlogServices.viewSingleBlog(req.params.id);
      if (blog == null) {
        return res.status(404).json({ Error: "Blog Not Found!!" });
      }
      return res.status(200).json({ blog });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async deleteBlog(req, res) {
    try {
      await BlogServices.deleteBlog(req.params.id);
      return res.status(200).json({ message: "Blog Deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
  static async updateBlog(req, res) {
    try {
      const { title, content, image } = req.body;
      const result = await cloudinary.uploader.upload(image, {
        folder: "my_brand_andela",
      });
      let data = {
        title,
        content,
        image: { public_id: result.public_id, url: result.secure_url },
      };

      const response = await BlogServices.updateBlog(req.params.id, data);
      if (response.data == null) {
        return res.status(404).json({ Error: "Blog doesn't exist!!" });
      }
      return res.status(200).json({ UpdatedBlog: response.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }
}
