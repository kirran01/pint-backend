const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  day: {
    type: Date,
    required: false,
  },
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
