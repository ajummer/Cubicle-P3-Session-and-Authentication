const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Accessory name is required !"],
    minLength: [5, "Accessory name too short ! Must be at least 5 characters long !"],
    match: [/[A-Za-z0-9\s]+/, "Accessory name must be alphanumeric !"],
  },
  description: {
    type: String,
    required: [true, "Accessory description is required !"],
    minLength: [20, "Accessory description too short ! Must be at least 20 characters long !"],
    match: [/[A-Za-z0-9\s]+/, "Accessory description must be alphanumeric !"],
  },
  imageUrl: {
    type: String,
    required: [true, "Accessory image is required !"],
    match: [/[https?://[^\s]+]/, "Accessory imageUrl should start with http or https"],
  },
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
