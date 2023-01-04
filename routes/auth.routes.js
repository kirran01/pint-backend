const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/signup", (req, res) => {
  res.send("post route hit XD");
});

module.exports = router;
