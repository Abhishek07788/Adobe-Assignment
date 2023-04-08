const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
    minlength: 1,
    maxlength: 300,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  likes: { type: Number, min: 0, default: 0 },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
