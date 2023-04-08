const express = require("express");
const User = require("../model/user.model");
const app = express.Router();

//get all users
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// POST /users: Create a new user.
app.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(500)
        .send({ status: false, message: "User Already Exist!!" });
    } else {
      await User.create(req.body);
      return res.status(200).send({ status: true, message: "User Created!!" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET /users/{id}: Retrieve a user by id.
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.find({ _id: id });
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// PUT /users/{id}: Update a user's name or bio by id.
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.updateOne({ _id: id }, { $Set: req.body });
    res.status(200).send("User updated!!");
  } catch (e) {
    res.status(500).send(e);
  }
});

// DELETE /users/{id}: Delete a user by id.
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    res.status(200).send("User Deleted!!");
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET /analytics/users: Retrieve the total number of users.
app.get("/analytics/users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).send({ totalUsers });
  } catch (e) {
    res.status(500).send(e);
  }
});

// GET /analytics/users/top-active: Retrieve the top 5 most active users, based on the number of posts.

module.exports = app;
