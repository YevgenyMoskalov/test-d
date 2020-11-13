const UserModel = require('./model');

function create(profile) {
  return UserModel.create(profile);
}

function findByEmail(email) {
  return UserModel.findOne({ email });
}

module.exports = {
  create,
  findByEmail,
};
