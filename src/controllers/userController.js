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
    const errMessages = [err.message];
    res.status(404).render("users/login", { errMessages });
  }
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    await userServices.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (err) {
    // if there are multiple errors it will map the errors , but if there is only one error it will return the error message like an array because  handlebars {{#each}} requires an array to itterate 
    const errMessages = err.errors
      ? Object.values(err.errors).map((err) => err.message)
      : [err.message];
    res.status(400).render("users/register", { errMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
