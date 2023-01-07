const Board = require("../models/Board.model");

const createBoardController = (req, res) => {
  const { name, description, owner, posts } = req.body;
  Board.create({
    name,
    description,
    owner,
    posts,
  })
    .then((createdBoard) => {
      res.send(createdBoard);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { createBoardController };
