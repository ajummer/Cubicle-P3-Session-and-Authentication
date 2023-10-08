const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const { SECRET } = require("../constans.js");

exports.register = async (userData) => {
  const { username } = userData;
  const userExists = await User.exists({ username });
  if (userExists) {
    throw new Error("Username already exists");
  } else {
    User.create(userData);
  }
};

exports.login = async (username, password) => {
  // Find user

  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Cannot find username or password");
  }

  // Validate password

  const isValid = bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Cannot find username or password");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });

  return token;
};
