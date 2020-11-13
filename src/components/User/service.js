const UserModel = require('./model');

function create(profile) {
  return UserModel.create(profile);
}

function findByEmail(email) {
  return UserModel.findOne({ email });
}

function findByName(name) {
  return UserModel.findOne({ name });
}

module.exports = {
  create,
  findByEmail,
};
