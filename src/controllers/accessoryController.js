const router = require("express").Router();
const { createAccessory } = require("../services/accessoryService.js");

router.get("/create", (req, res) => {
  res.render("accessories/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const newAccessory = await createAccessory({
    name,
    description,
    imageUrl,
  });
  res.redirect("/");
});

module.exports = router;
