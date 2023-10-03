const mongoose = require("mongoose");
const { url } = require("../constans.js");

async function dbConnect() {
  await mongoose.connect(url);
}

module.exports = dbConnect;
