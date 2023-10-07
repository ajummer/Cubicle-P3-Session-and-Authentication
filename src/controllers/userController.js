const router = require("express").Router();
const userServices = require("../services/userServices.js");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await userServices.login(username, password);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const errMessage = err.message
    res.status(404).render("users/login", { errMessage });
  }
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userServices.register({ username, password, repeatPassword });
  res.redirect("/users/login");
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
