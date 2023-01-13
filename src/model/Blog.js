import mongoose from "mongoose";
const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  comments: [{ name: String, message: String, email: String, date: Date }],
  likes: { Count: { type: Number, default: 0 }, People: Array },
  date: Date,
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
