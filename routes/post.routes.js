const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const {
  createPostController,
  deletePostController,
  getPostController,
  getPostByIdController,
  updatePostController,
} = require("../controllers/post.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/create-post", isAuthenticated, createPostController);
router.delete("/delete-post/:id", deletePostController);
router.get("/all", getPostController);
router.put("/update-post/:id", updatePostController);
router.get("/:id", getPostByIdController);

module.exports = router;
