const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");

const SECRET = "b3d5f1da16766276b43945d057376b6bd1767ad6621720bcdc9953ce5a782ca47f29e39b948a734a7f021869c0c186c2";

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
