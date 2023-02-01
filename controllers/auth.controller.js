const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = (req, res) => {
  const { email, password, username, profileImage } = req.body;
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({
        message: "field(s) are missing",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
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

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

const loginController = (req, res) => {
  console.log("login controller running");
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
    .populate("favorites")
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
  User.findByIdAndUpdate(req.payload._id, req.body, { new: true })
    .then((updatedUser) => {
      res.send({ updatedUser });
    })
    .catch((err) => {
      res.send(err);
    });
};

const getUserInfoController = (req, res) => {
  const payloadId = req.payload._id;
  User.findById(payloadId)
    .populate("favorites posts")
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

const deleteUserController = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      return Comment.deleteMany({ owner: deletedUser._id })
        .then(() => {
          return Post.deleteMany({ owner: deletedUser._id });
        })
        .then((deletedPosts) => {
          res.send(deletedPosts);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  signupController,
  loginController,
  editUserController,
  getUserInfoController,
  deleteUserController,
  getUserById,
};
