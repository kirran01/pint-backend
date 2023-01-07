const Post = require("../models/Post.model");

const createPostController = (req, res) => {
  // res.send("post post route hit");
  const { image, description, link, owner, board, comments } = req.body;
  Post.create({
    owner,
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

module.exports = { createPostController };
