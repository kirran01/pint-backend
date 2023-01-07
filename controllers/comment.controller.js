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
};
