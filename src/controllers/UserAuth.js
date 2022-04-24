const bycrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = (req, res, next) => {
  bycrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

const login = (req, res, next) => {
  //Use your Mongoose model to check if the email entered by the user corresponds to an existing user in the database.
  User.findOne({ username: req.body.username })
    .then((user) => {
      //If it does not, return a  401 Unauthorized  error
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      //Use bcrypt's compare function to compare the user-entered password with the hash saved in the database.
      bycrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          //If it does not match, return a  401 Unauthorized  error
          if (!valid) {
            return res.status(401).json({
              error: "Password Incorect",
            });
          }

          const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            "DJIBY",
            {
              expiresIn: "24h",
            }
          );

          //If it matches, your user has valid credentials return a 200  response containing the user ID and a token
          res.status(200).json({
            userId: user._id,
            isAdmin: user.isAdmin,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

module.exports = { signup, login };
