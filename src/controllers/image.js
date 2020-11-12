const sharp = require('sharp');
const sizeOf = require('image-size');
const Operation = require('../components/Image/model');

exports.getAll = async (req, res) => {
  const operations = await Operation.find({}).catch((error) => {
    res.status(500).json({
      error,
    });
  });
  res.status(200).send(operations);
};

exports.getRange = async (req, res) => {
  const operations = await Operation.find({
    date: {
      $gte: new Date(req.query.first_date),
      $lt: new Date(req.query.last_date),
    },
  }).catch((error) => {
    res.status(500).json({
      error,
    });
  });
  res.status(200).send(operations);
};

exports.crop = async (req, res) => {
  const x = parseInt(req.body.x, 10);
  const y = parseInt(req.body.y, 10);
  const { data } = req.files.image;
  const dimensions = sizeOf(data);
  if (x && y && data) {
    await Operation.create({
      type: 'Cropping',
      parameters: [`width - ${dimensions.width - x}`, `height - ${dimensions.height - y}`, `x - ${x}`, `y - ${y}`],
    }).then(
      sharp(data).extract({
        left: x, top: y, width: dimensions.width - x, height: dimensions.height - y,
      }).pipe(res),
    ).catch((error) => {
      res.status(500).json({
        error,
      });
    });
  } else {
    res.status(400).json({
      message: 'bad request',
    });
  }
};

exports.resize = async (req, res) => {
  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);
  const { data } = req.files.image;

  if (width && height && data) {
    await Operation.create({
      type: 'Resizing',
      parameters: [`width - ${width}`, `height - ${height}`],
    }).then(
      sharp(data)
        .resize(width, height).pipe(res),
    ).catch((error) => {
      res.status(500).json({
        error,
      });
    });
  } else {
    res.status(400).json({
      message: 'bad request',
    });
  }
};
