const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required !"],
    minLength: [5, "Username too short !"],
    match: [/^[A-Za-z0-9]+$/, "Username must be alphanumeric"],
  },
  password: {
    type: String,
    required: [true, "Password is required !"],
    minLength: [8, "Password too short !"],
    match: [/^[A-Za-z0-9]+$/, "Username must be alphanumeric"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Passwords don't match !");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
