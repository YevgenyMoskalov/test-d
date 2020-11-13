const ImageModel = require('./model');

function findAll() {
  return ImageModel.find({});
}

function getRange(firstDate, lastDate) {
  return ImageModel.find({
    date: {
      $gte: new Date(firstDate),
      $lt: new Date(lastDate),
    },
  });
}

function crop(width, height, x, y) {
  return ImageModel.create({
    type: 'Cropping',
    parameters: [`width - ${width - x}`, `height - ${height - y}`, `x - ${x}`, `y - ${y}`],
  });
}

function resize(width, height) {
  return ImageModel.create({
    type: 'Resizing',
    parameters: [`width - ${width}`, `height - ${height}`],
  });
}

module.exports = {
  findAll,
  getRange,
  resize,
  crop,
};
