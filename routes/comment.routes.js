const express = require("express");
const router = express.Router();
const {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} = require("../controllers/comment.controller");

router.post("/create-comment", createCommentController);
router.delete("/delete/:id", deleteCommentController);
router.put("/update-comment/:id", updateCommentController);

module.exports = router;
