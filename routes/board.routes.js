const express = require("express");
const router = express.Router();
const {
  createBoardController,
  getBoardsController,
  getBoardByIdController,
  updateBoardController,
  deleteBoardController,
} = require("../controllers/board.controller");

router.post("/create-board", createBoardController);
router.get("/get-boards", getBoardsController);
router.get("/get-board/:id", getBoardByIdController);
router.delete("/delete-board/:id", deleteBoardController);
router.put("/update-board/:id", updateBoardController);
//how to make a comment
module.exports = router;
