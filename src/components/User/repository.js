const UserModel = require('./model');

function create(profile) {
  return UserModel.create(profile);
}

function findByEmail(userEmail) {
  return UserModel.findOne({ email: userEmail });
}

function findByName(userName) {
  return UserModel.findOne({ name: userName });
}

module.exports = {
  create,
  findByEmail,
  findByName,
};
