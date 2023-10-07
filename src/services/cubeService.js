const Cube = require("./../models/Cube");



exports.createCube = async (cubeData) => {
  const newCube = await Cube.create(cubeData);
  return newCube;
};

exports.getAllCubes = async (search, from, to) => {
  let filteredCubes = await Cube.find().lean();

  if (search) {
    filteredCubes = filteredCubes.filter((cube) =>
      cube.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (from) {
    filteredCubes = filteredCubes.filter(
      (cube) => cube.difficultyLevel >= Number(from)
    );
  }
  if (to) {
    filteredCubes = filteredCubes.filter(
      (cube) => cube.difficultyLevel <= Number(to)
    );
  }
  return filteredCubes;
};

exports.getSingleCube = async (id) => {
  try {
    const cube = await Cube.findById(id).populate("accessories").lean();
    return cube;
  } catch (err) {
    res.redirect("/404");
    return;
  }
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId).populate("accessories")
  cube.accessories.push(accessoryId);
  return  cube.save()
}
exports.updateCube = (cubeId, cubeData) => {
  const cube = Cube.findByIdAndUpdate(cubeId, cubeData);
  return cube;
};

exports.deleteCube = (cubeId) => Cube.findByIdAndDelete(cubeId);
