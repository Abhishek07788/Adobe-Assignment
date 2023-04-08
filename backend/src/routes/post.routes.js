const express = require("express");
const Post = require("../model/post.model");
const app = express.Router();

//get all posts
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// POST /posts: Create a new post. The request should include the user_id.
app.post("/", async (req, res) => {
  try {
    await Post.create(req.body);
    return res.status(200).send({ status: true, message: "Post Created!!" });
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET /posts/{id}: Retrieve a post by id.
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ _id: id });
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// PUT /posts/{id}: Update a post's content by id.
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.updateOne({ _id: id }, { $set: req.body });
    res.status(200).send("Post updated!!");
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE /posts/{id}: Delete a post by id.
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deleteOne({ _id: id });
    res.status(200).send("Post Deleted!!");
  } catch (e) {
    res.status(500).send(e);
  }
});

// POST /posts/{id}/like: Increment the like count of a post by id.
app.post("/:id/like", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id }, { _id: 0, likes: 1 });
    await Post.updateOne({ _id: id }, { $set: { likes: post.likes + 1 } });
    res.status(200).send({ message: "Liked!!" });
  } catch (e) {
    res.status(500).send(e);
  }
});

// POST /posts/{id}/unlike: Decrement the like count of a post by id. The count should not go below 0.
app.post("/:id/unlike", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id }, { _id: 0, likes: 1 });
    if (post.likes === 0) {
      return res
        .status(300)
        .send({ message: "The count should not go below 0!!" });
    } else {
      await Post.updateOne({ _id: id }, { $set: { likes: post.likes - 1 } });
      res.status(200).send({ message: "unlike!!" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET /analytics/posts: Retrieve the total number of posts.
app.get("/analytics/posts", async (req, res) => {
  try {
    const TotalPost = await Post.countDocuments();
    res.status(200).send({ TotalPost });
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET /analytics/posts/top-liked: Retrieve the top 5 most liked posts.
app.get("/analytics/posts/top-liked", async (req, res) => {
  try {
    const topPosts = await Post.find().sort({ likes: -1 }).limit(5);
    res.status(200).send({ topPosts });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app;
