const router = require("express").Router();
const {
  createCube,
  getSingleCube,
  attachAccessory,
  updateCube,
  deleteCube,
} = require("../services/cubeService.js");

const { getWithoutOwned } = require("../services/accessoryService.js");

const { getDifficultyLevel } = require("../utils/utils.js");

const { isAuth } = require("../middlewares/authMiddleware.js");

router.get("/create", isAuth,  (req, res) => {
  res.render("cubes/create");
});

router.post("/create", isAuth, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  try {
    const newCube = await createCube({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
      owner: req.user._id,
    });
    res.redirect("/");
  } catch (err) {
    const errMessages = Object.values(err.errors).map((err) => err.message);
    res.status(400).render("cubes/create", { errMessages: errMessages });
  }
});

router.get("/details/:id", async (req, res) => {
  
  const cube = await getSingleCube(req.params.id).lean();
  if (!cube) {
    res.redirect("/404");
    return;
  }
  const isOwner = cube.owner == req.user?._id;

  res.render("cubes/details", { cube, isOwner });
});

router.get("/details/:id/attach-accessory", isAuth, async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  if (!cube) {
    res.redirect("/404");
    return;
  }
  const accessories = await getWithoutOwned(cube.accessories).lean();

  const hasAccessories = accessories.length > 0;
  res.render("accessories/attach", { accessories, cube, hasAccessories });
});

router.post("/details/:id/attach-accessory", isAuth , async (req, res) => {
  const cubeId = req.params.id;
  const accessoryId = req.body.accessory;
  await attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/details/${cubeId}`);
});

router.get("/details/:id/edit", isAuth, async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  const options = getDifficultyLevel(cube.difficultyLevel);
  res.render("cubes/edit", { cube, options });
});

router.post("/details/:id/edit", isAuth, async (req, res) => {
  const cubeData = req.body;
  const cubeId = req.params.id;
  await updateCube(cubeId, cubeData);
  res.redirect(`/cubes/details/${req.params.id}`);
});

router.get("/details/:id/delete", isAuth, async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  const options = getDifficultyLevel(cube.difficultyLevel);
  res.render("cubes/delete", { cube, options });
});

router.post("/details/:id/delete", isAuth, async (req, res) => {
  const cubeId = req.params.id;
  await deleteCube(cubeId);
  res.redirect("/");
});

module.exports = router;
