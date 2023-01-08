const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const {
  createPostController,
  deletePostController,
  getPostController,
  updatePostController,
} = require("../controllers/post.controller");

router.post("/create-post", createPostController);
router.delete("/delete-post/:id", deletePostController);
router.get("/all", getPostController);
router.put("/update-post/:id", updatePostController);

module.exports = router;
