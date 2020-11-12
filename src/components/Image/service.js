/* eslint-disable no-return-await */
const ImageModel = require('./model');

async function getAll() {
  return await ImageModel.find({});
}

async function getRange() {

}

async function resize() {

}

async function crop() {

}

module.exports = {
  getAll,
  getRange,
  resize,
  crop,
};
