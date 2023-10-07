const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Cube name is required !"],
    minLength: [5, "Cube name too short ! Must be at least 5 characters long !"],
    match: [/[A-Za-z0-9\s]+/, "Cube name must be alphanumeric !"],
  },
  description: {
    type: String,
    required: [true, "Cube description is required !"],
    minLength: [20, "Cube description too short ! Must be at least 20 characters long !"],
    match: [/[A-Za-z0-9\s]+/, "Cube description must be alphanumeric !"],
  },
  imageUrl: {
    type: String,
    required: [true, "Cube image is required !"],
    match: [/[https?://[^\s]+]/, "Cube imageUrl should start with http or https"],
  },
  difficultyLevel: Number,
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
