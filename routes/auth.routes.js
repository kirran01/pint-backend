const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const {
  signupController,
  loginController,
  editUserController
} = require("../controllers/auth.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.post("/signup", signupController);
router.post("/login", loginController);
router.put("/edit-user", isAuthenticated, editUserController)
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;
