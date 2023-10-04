const router = require("express").Router();
const {
  createCube,
  getSingleCube,
  attachAccessory,
  updateCube,
  deleteCube,
} = require("../services/cubeService.js");

const {
  getWithoutOwned,
} = require("../services/accessoryService.js");

router.get("/create", (req, res) => {
  res.render("cubes/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  const newCube = await createCube({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
  });
  res.redirect("/");
});

router.get("/details/:id", async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  if (!cube) {
    res.redirect("/404");
    return;
  }

  res.render("cubes/details", { cube });
});

router.get("/details/:id/attach-accessory", async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();

  const accessories = await getWithoutOwned(cube.accessories).lean();

  const hasAccessories = accessories.length > 0;
  res.render("accessories/attach", { accessories, cube, hasAccessories });
});

router.post("/details/:id/attach-accessory", async (req, res) => {
  const cubeId = req.params.id;
  const accessoryId = req.body.accessory;
  await attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/details/${cubeId}`);
});

router.get("/details/:id/edit", async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  res.render("cubes/edit", { cube });
});

router.post("/details/:id/edit", async (req, res) => {
  const cubeData = req.body;
  const cubeId = req.params.id;
  await updateCube(cubeId, cubeData);
  res.redirect(`/cubes/details/${req.params.id}`);
});

router.get("/details/:id/delete", async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  res.render("cubes/delete", { cube });
});

router.post("/details/:id/delete", async (req, res) => {
  const cubeId = req.params.id;
  await deleteCube(cubeId);
  res.redirect("/");
});

module.exports = router;
