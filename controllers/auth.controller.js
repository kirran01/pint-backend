const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const loginController = (req, res) => {
  //   res.send("login route hit :D");
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


module.exports = { signupController, loginController };
