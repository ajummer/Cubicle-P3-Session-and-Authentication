const router = require("express").Router();
const {
  createCube,
  getAllCubes,
  getSingleCube,
  attachAccessory,
} = require("../services/cubeService.js");

const { getAllAccessories,getWithoutOwned } = require("../services/accessoryService.js");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  const newCube = await createCube({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/");
});

router.get("/details/:id", async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  if (!cube) {
    res.redirect("/404");
    return;
  }

  res.render("details", { cube });
});

router.get("/details/:id/attach-accessory", async (req, res) => {
  const cube = await getSingleCube(req.params.id).lean();
  console.log(cube.accessories)
  
  const accessories = await getWithoutOwned(cube.accessories).lean();
 
  const hasAccessories = accessories.length > 0;
  res.render("accessories/attach", { accessories, cube, hasAccessories });
});

router.post("/details/:id/attach-accessory", async (req, res) => {
  const cubeId = req.params.id;
  const accessoryId = req.body.accessory;
  await attachAccessory(cubeId, accessoryId);
  res.redirect(`/cubes/details/${cubeId}`)
});

module.exports = router;
