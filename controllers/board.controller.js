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
const getBoardsController = (req, res) => {
//   res.send("get boards controller");
  Board.find()
    .then((foundBoards) => {
      res.send(foundBoards);
    })
    .catch((err) => {
      res.send(err);
    });
};
const getBoardByIdController = (req, res) => {
  Board.findById(req.params.id)
    .then((foundBoard) => {
      res.send(foundBoard);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteBoardController = (req, res) => {
  Board.findByIdAndDelete(req.params.id)
    .then((x) => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send(err);
    });
};
const updateBoardController = (req, res) => {
  const { name, description, posts } = req.body;
  Board.findByIdAndUpdate(req.params.id, {
    name,
    description,
    posts,
  })
    .then((updatedBoard) => {
      res.send(updatedBoard);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  createBoardController,
  getBoardsController,
  getBoardByIdController,
  deleteBoardController,
  updateBoardController,
};
