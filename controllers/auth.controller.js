const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = (req, res) => {
  const { email, password, username, profileImage } = req.body;
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
      profileImage,
    })
      .then((createdUser) => {
        res.send(createdUser);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

const loginController = (req, res) => {
  const { username, password } = req.body;
  if (!req.body.username || !req.body.password) {
    return res.json({
      error: {
        message: "fields are blank",
      },
    });
  }
  let theUser;
  User.findOne({
    username,
  })
  .populate('favorites')
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject("invalid credentials");
      }
      theUser = foundUser;
      console.log(foundUser);
      return bcryptjs.compare(password, foundUser.password);
    })
    .then((isValidPassword) => {
      if (!isValidPassword) {
        return Promise.reject("invalid credentials");
      }
      const payload = {
        _id: theUser._id,
        username: theUser.username,
        email: theUser.email,
        profileImage: theUser.profileImage,
        favorites:theUser.favorites
      };
      console.log(payload, "<---payload");
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "72h",
      });
      res.json({
        authToken: authToken,
        hi: "hello",
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

const editUserController = (req, res) => {
  User.findByIdAndUpdate(
    req.payload._id,
    {
      profileImage: req.body.profileImage,
      username: req.body.username,
      email: req.body.email,
    },
    { new: true }
  )
    .then((updatedUser) => {
      const payload = {
        _id: updatedUser._id,
        username: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "72h",
      });
      res.send({ updatedUser: updatedUser, updatedToken: authToken });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { signupController, loginController, editUserController };
