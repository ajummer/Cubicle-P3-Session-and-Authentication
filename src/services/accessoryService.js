const Accessory = require("./../models/Accessory");

exports.createAccessory = async (accessoryData) => {
  const newAccessory = await Accessory.create(accessoryData);
  return newAccessory;
};

exports.getAllAccessories = async () => {
  const accessories = await Accessory.find().lean();
  return accessories;
};

exports.getWithoutOwned = (accessoryIds) => {
  return Accessory.find({ _id: { $nin: accessoryIds } });
};
