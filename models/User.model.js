const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  ],
  favorites:[
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
