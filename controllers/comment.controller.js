const Comment = require("../models/Comment.model");

const createCommentController = (req, res) => {
  const { day, comment, owner } = req.body;
  Comment.create({
    day: Date.now(),
    comment,
    owner,
  })
    .then((createdComment) => {
      res.send(createdComment);
    })
    .catch((err) => {
      res.send(er);
    });
};

module.exports = { createCommentController };
