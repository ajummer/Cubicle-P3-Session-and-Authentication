const jwt = require("../lib/jwt.js");
const { SECRET } = require("../constans.js");

exports.auth = async (req, res, next) => {
  const token = req.cookies.auth;

  if (token) {
    try {
      const user = await jwt.sign(token, SECRET);
      req.user = user;
    } catch (err) {
      res.clearCookie("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};
