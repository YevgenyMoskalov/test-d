const ImageService = require('./service');
const ImageValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

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
    const { error } = ImageValidation.getRange(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const images = await ImageService.getRange(req.query);
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
}

async function crop(req, res, next) {
  try {
    const { error } = ImageValidation.crop(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const croppedImage = await ImageService.crop(req);
    croppedImage.pipe(res);
  } catch (error) {
    next(error);
  }
}

async function resize(req, res, next) {
  try {
    const { error } = ImageValidation.resize(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const resizedImage = await ImageService.resize(req);
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
