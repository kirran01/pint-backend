const express = require("express");
const router = express.Router();
const {
  createCommentController,
  deleteCommentController,
  updateCommentController,
  getCommentsController,
} = require("../controllers/comment.controller");

router.post("/create-comment/:postid", createCommentController);
router.delete("/delete/:id", deleteCommentController);
router.put("/update-comment/:id", updateCommentController);
router.get("/get-comments", getCommentsController);

module.exports = router;
