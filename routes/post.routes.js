const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const { createPostController } = require("../controllers/post.controller");

router.post("/create-post", createPostController);

module.exports = router;
