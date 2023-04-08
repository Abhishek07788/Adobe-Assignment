const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
    unique: true,
  },
  bio: { type: String, minlength: 0, maxlength: 200, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
