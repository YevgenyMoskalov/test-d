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

function addOperation(operationType, params) {
  return ImageModel.create({
    type: operationType,
    parameters: params,
  });
}

module.exports = {
  findAll,
  getRange,
  addOperation,
};
