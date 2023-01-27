const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const {
  signupController,
  loginController,
  editUserController,
  getUserInfoController,
  getUserById,
  deleteUserController,
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.post("/signup", signupController);
router.post("/login", loginController);
router.put("/edit-user", isAuthenticated, editUserController);
router.get("/verify", isAuthenticated, getUserInfoController);
router.get("/get-user/:id", isAuthenticated, getUserById);
router.delete("/delete-user/:id", isAuthenticated, deleteUserController);

module.exports = router;
