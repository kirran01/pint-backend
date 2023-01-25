const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const {
  createPostController,
  deletePostController,
  getPostController,
  getPostByIdController,
  updatePostController,
  addToFavorites,
  deleteFromFavorites,
} = require("../controllers/post.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/create-post", isAuthenticated, createPostController);
router.delete("/delete-post/:id", deletePostController);
router.delete("/delete-favorite", isAuthenticated, deleteFromFavorites);
router.put("/add-favorite", isAuthenticated, addToFavorites);
router.put("/update-post/:id", updatePostController);
router.get("/all", getPostController);
router.get("/:id", getPostByIdController);

module.exports = router;
