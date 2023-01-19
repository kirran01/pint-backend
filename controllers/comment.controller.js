const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const mongoose = require("mongoose");

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
    owner: req.payload._id,
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
        .populate({
          path: "comments",
          populate: {
            path: "owner",
            model: "User",
          },
        })
        .then((updatedPost) => {
          res.send(updatedPost);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteCommentController = (req, res) => {
  return Comment.findByIdAndDelete(req.params.id)
    .then((deletedComment) => {
      console.log(deletedComment);
      return Post.findByIdAndUpdate(
        deletedComment.post,
        {
          $pull: {
            comments: mongoose.Types.ObjectId(deletedComment._id),
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
const updateCommentController = (req, res) => {
  const { comment, day } = req.body;
  return Comment.findByIdAndUpdate(req.params.id, {
    comment,
    day: Date.now(),
  })
    .then((updatedComment) => {
      return (
        Post.findById(updatedComment.post)
          //no need to push in new id when we are updating or update, just find and populate
          .populate({
            path: "comments",
            populate: {
              path: "owner",
              model: "User",
            },
          })
          .then((updatedPost) => {
            res.send(updatedPost);
          })
      );
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
