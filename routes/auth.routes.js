const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { signupController } = require("../controllers/auth.controller");

router.post("/signup", signupController);

module.exports = router;
