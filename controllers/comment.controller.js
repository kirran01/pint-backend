const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

const getCommentsController = (req, res) => {
  Comment.find()
    .then((foundComments) => {
      res.send(foundComments);
    })
    .catch((err) => {
      res.send(err);
    });
};
const createCommentController = (req, res) => {
  const { day, comment, owner, post } = req.body;
  return Comment.create({
    day: Date.now(),
    comment,
    // owner: req.payload._id,
    owner,
    post: req.params.postid,
  })
    .then((createdComment) => {
      return Post.findByIdAndUpdate(
        createdComment.post,
        {
          $push: {
            comments: createdComment._id,
          },
        },
        { new: true }
      )
        .populate("comments")
        .then((updatedPost) => {
          res.send(updatedPost);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteCommentController = (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((deletedComment) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send(err);
    });
};
const updateCommentController = (req, res) => {
  const { comment, day } = req.body;
  Comment.findByIdAndUpdate(req.params.id, {
    comment,
    day: Date.now(),
  })
    .then((updatedComment) => {
      res.send(updatedComment);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  createCommentController,
  deleteCommentController,
  updateCommentController,
  getCommentsController,
};
