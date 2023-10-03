const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");

const SECRET = "ibetyoucanthackthissecretcodedamnitbruh";

exports.register = (userData) => User.create(userData);

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
