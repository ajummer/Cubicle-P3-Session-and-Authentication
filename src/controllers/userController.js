const router = require("express").Router();
const userServices = require("../services/userServices.js");

router.get("/login", (req, res) => {
  res.render("users/loginPage");
});

router.get("/register", (req, res) => {
  res.render("users/registerPage");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userServices.register({username, password, repeatPassword});
});

module.exports = router;
