const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("users/loginPage");
});

router.get("/register", (req, res) => {
  res.render("users/registerPage");
});

module.exports = router;
