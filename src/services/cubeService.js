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

exports.getSingleCube = (id) => {
  const cube = Cube.findById(id).populate("accessories");
  return cube;
};

exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await this.getSingleCube(cubeId);
  cube.accessories.push(accessoryId);
  return cube.save();
};
