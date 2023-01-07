const express = require("express");
const router = express.Router();
const {
  createCommentController,
} = require("../controllers/comment.controller");

router.post("/post-comment", createCommentController);

module.exports = router;
