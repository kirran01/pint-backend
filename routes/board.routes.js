const express = require("express");
const router = express.Router();
const { createBoardController } = require("../controllers/board.controller");

router.post("/create-board", createBoardController);

module.exports = router;
