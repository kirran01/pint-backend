const User = require("../models/User.model");

const signupController = (req, res) => {
  //   res.send("post route hit XD");
  const { email, password, username } = req.body;
  User.create({
    email,
    password,
    username,
  })
    .then((createdUser) => {
      res.send(createdUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { signupController };
