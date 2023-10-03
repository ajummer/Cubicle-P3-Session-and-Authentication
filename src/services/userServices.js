const User = require("../models/User");
const bcrypt = require("bcrypt");

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

  return user;
};
