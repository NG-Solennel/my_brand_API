import Blog from "../model/Blog";
import validateBlogPost from "../validations/blog_validations";
export class BlogServices {
  static async createBlog(data) {
    const { title, image, content, date } = data;
    let exists = await Blog.findOne({ title: data.title });
    if (exists) {
      return { type: "error", data: "Blog already exists" };
    } else {
      const blog = new Blog({
        title,
        content,
        image,
        date,
      });
      await blog.save();
      const created = await Blog.findOne({ _id: blog._id });
      return { type: "response", data: created };
    }
  }

  static async viewBlogs() {
    const blogs = await Blog.find();
    return blogs;
  }
  static async viewSingleBlog(id) {
    const blog = await Blog.findOne({ _id: id });
    return blog;
  }
  static async deleteBlog(id) {
    return await Blog.deleteOne({ _id: id });
  }
  static async updateBlog(id, data) {
    await Blog.findOneAndUpdate(
      { _id: id },
      {
        title: data.title,
        content: data.content,
        image: data.image,
        date: data.date,
      }
    );
    const blog = await Blog.findOne({ _id: id });
    return { type: "response", data: blog };
  }
}
