const ImageService = require('./service');
const ImageValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

async function findAll(req, res) {
  try {
    const images = await ImageService.findAll();
    res.status(200).json(images);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({
      error,
    });
  }
}

async function getRange(req, res) {
  try {
    const { error } = ImageValidation.getRange(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const images = await ImageService.getRange(req.query);
    res.status(200).json(images);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({
      error,
    });
  }
}

async function crop(req, res) {
  try {
    const { error } = ImageValidation.crop(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const croppedImage = await ImageService.crop(req);
    croppedImage.pipe(res);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({
      error,
    });
  }
}

async function resize(req, res) {
  try {
    const { error } = ImageValidation.resize(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const resizedImage = await ImageService.resize(req);
    resizedImage.pipe(res);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({
      error,
    });
  }
}

module.exports = {
  findAll,
  getRange,
  crop,
  resize,
};
