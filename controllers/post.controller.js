const Post = require("../models/Post.model");

const createPostController = (req, res) => {
  const { image, description, link, title, board, comments } = req.body;
  Post.create({
    title,
    owner: req.payload._id,
    image,
    description,
    link,
  })
    .then((createdPost) => {
      res.send(createdPost);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deletePostController = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((x) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send(err);
    });
};
const getPostController = (req, res) => {
  Post.find()
    .populate({
      path: "comments",
      populate: {
        path: "owner",
        model: "User",
      },
    })
    .then((foundPosts) => {
      res.send(foundPosts);
    })
    .catch((err) => {
      res.send(err);
    });
};
const updatePostController = (req, res) => {
  const { title, description, link, board } = req.body;
  Post.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      link,
      board,
    },
    { new: true }
  )
    .then((updatedPost) => {
      res.send(updatedPost);
    })
    .catch((err) => {
      res.send(err);
    });
};
const getPostByIdController = (req, res) => {
  Post.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        path: "owner",
        model: "User",
      },
    })
    .then((foundPost) => {
      res.send(foundPost);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  createPostController,
  deletePostController,
  getPostController,
  updatePostController,
  getPostByIdController,
};