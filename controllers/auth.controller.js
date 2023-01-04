const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

const signupController = (req, res) => {
  const { email, password, username } = req.body;
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({
      error: {
        message: "field(s) are missing",
      },
    });
  }
  bcryptjs.hash(password, 10).then((hashedPassword) => {
    return User.create({
      email,
      password: hashedPassword,
      username,
    })
      .then((createdUser) => {
        res.send(createdUser);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

module.exports = { signupController };
