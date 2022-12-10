const express = require("express");
const Blog = require("./models/Blog");
const router = express.Router();

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});

router.post("/blogs", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  });
  await blog.save();
  res.send(blog);
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});

router.patch("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }

    await blog.save();
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});

router.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});
module.exports = router;
