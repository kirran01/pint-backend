const Post = require("../models/Post.model");
const User = require("../models/User.model");

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
  Post.findById(req.params.id)
    .then((foundPost) => {
      if (!foundPost) {
        return res.send("Post not found");
      }
      if (foundPost.owner.toString() !== req.payload._id.toString()) {
        return res.send("Unauthorized access");
      }
      return Post.findByIdAndDelete(req.params.id)
        .then((deletedPost) => {
          res.send(deletedPost);
        })
        .catch((err) => {
          res.send(err);
        });
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
    .populate("owner")
    .then((foundPost) => {
      res.send(foundPost);
    })
    .catch((err) => {
      res.send(err);
    });
};
const addToFavorites = (req, res) => {
  User.findByIdAndUpdate(
    req.payload._id,
    {
      $push: {
        favorites: req.body.post,
      },
    },
    { new: true }
  )
    .populate("favorites")
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteFromFavorites = (req, res) => {
  User.findByIdAndUpdate(
    req.payload._id,
    {
      $pull: {
        favorites: req.params.id,
      },
    },
    { new: true }
  )
    .populate("favorites")
    .then((updatedUser) => {
      res.send(updatedUser);
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
  addToFavorites,
  deleteFromFavorites,
};
