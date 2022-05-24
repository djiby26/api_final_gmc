const bycrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = ({ id, isAdmin }) => {
  return jwt.sign({ userId: id, isAdmin: isAdmin }, "DJIBY", {
    expiresIn: "24h",
  });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json("Please add all fields");
    // throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("User already exists");
    // throw new Error("User already exists");
  }

  //generating the hash
  const hash = await bycrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hash,
  });

  if (user) {
    res.status(201).json({
      userId: user.id,
      username: user.username,
      email: user.email,
      token: generateToken({ id: user._id, isAdmin: user.isAdmin }),
    });
  } else {
    res.status(400).json("Invalid user data");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  //Use your Mongoose model to check if the email entered by the user corresponds to an existing user in the database.
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  if (user && (await bycrypt.compare(password, user.password))) {
    res.status(200).json({
      userId: user._id,
      isAdmin: user.isAdmin,
      token: generateToken({ id: user._id, isAdmin: user.isAdmin }),
    });
  } else {
    //If it does not, return a  400 error
    res.status(400).json({ error: "Invalid credentials" });
    // throw new Error("Invalid credentials");
  }
};

module.exports = { signup, login };
