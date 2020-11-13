const sharp = require('sharp');
const sizeOf = require('image-size');
const ImageService = require('./service');

function extract(data, width, height, x, y) {
  return sharp(data).extract({
    left: x, top: y, width: width - x, height: height - y,
  });
}

function resizing(data, width, height) {
  return sharp(data)
    .resize(width, height);
}

async function findAll(req, res, next) {
  try {
    const images = await ImageService.findAll();

    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
}

async function getRange(req, res, next) {
  try {
    const images = await ImageService.getRange(req.query.first_date, req.query.last_date);

    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
}

async function crop(req, res, next) {
  try {
    const x = parseInt(req.body.x, 10);
    const y = parseInt(req.body.y, 10);
    const { data } = req.files.image;
    const dimensions = sizeOf(data);
    const { width } = dimensions;
    const { height } = dimensions;
    if (x && y && data) {
      const croppedImage = extract(data, width, height, x, y);
      await ImageService.crop(width, height, x, y);
      croppedImage.pipe(res);
    } else {
      res.status(400).json({
        message: 'bad request',
      });
    }
  } catch (error) {
    next(error);
  }
}

async function resize(req, res, next) {
  try {
    const width = parseInt(req.body.width, 10);
    const height = parseInt(req.body.height, 10);
    const { data } = req.files.image;
    const resizedImage = resizing(data, width, height);
    await ImageService.resize(width, height);
    resizedImage.pipe(res);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  findAll,
  getRange,
  crop,
  resize,
};
