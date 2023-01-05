const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }]
});

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
