const express = require("express");
const router = express.Router();

let posts = [];

router.get("/", (req, res) => {
  res.json(posts);
});

router.post("/", (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res
      .status(400)
      .json({ error: "title, content y author son requeridos" });
  }

  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    comments: [],
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: "author y content son requeridos" });
  }

  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  const newComment = {
    id: Date.now().toString(),
    author,
    content,
    createdAt: new Date().toISOString(),
  };

  post.comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router;
