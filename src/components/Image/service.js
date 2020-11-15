const sharp = require('sharp');
const sizeOf = require('image-size');
const ImageRepository = require('./repository');

function getRange(query) {
  return ImageRepository.getRange(query.first_date, query.last_date);
}

function findAll() {
  return ImageRepository.findAll();
}

function addAnImageCroppingOperation(x, y, width, height) {
  ImageRepository.addOperation('Cropping', [`width - ${width - x}`, `height - ${height - y}`, `x - ${x}`, `y - ${y}`]);
}

function addAnImageResizingOperation(width, height) {
  ImageRepository.addOperation('Resizing', [`width - ${width}`, `height - ${height}`]);
}

function crop(req) {
  const x = parseInt(req.body.x, 10);
  const y = parseInt(req.body.y, 10);
  const { data } = req.files.image;
  const dimensions = sizeOf(data);
  const { width, height } = dimensions;
  const newImage = sharp(data).extract({
    left: x, top: y, width: width - x, height: height - y,
  });
  addAnImageCroppingOperation(x, y, width, height);
  return newImage;
}

function resize(req) {
  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);
  const { data } = req.files.image;
  const newImage = sharp(data)
    .resize(width, height);
  addAnImageResizingOperation();
  return newImage;
}

module.exports = {
  getRange,
  findAll,
  crop,
  resize,
};
