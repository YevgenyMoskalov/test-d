const bcrypt = require('bcryptjs');
const UserRepository = require('./repository');

function isUnique(email, name) {
  if (!UserRepository.findByEmail(email)) {
    throw new Error('Email already taken!');
  }
  if (!UserRepository.findByName(name)) {
    throw new Error('Name already taken!');
  }
}

function signup(userData) {
  const userEmail = userData.email;
  const userName = userData.name;
  isUnique(userEmail, userName);
  const userProfile = {
    email: userEmail,
    password: bcrypt.hashSync(userData.password, 10),
    name: userName,
  };
  return UserRepository.create(userProfile);
}

async function signin(authData) {
  const user = await UserRepository.findByEmail(authData.email);
  const valid = await bcrypt.compare(authData.password, user.password);
  if (!valid) {
    throw new Error('Wrong password!');
  }
  return user;
}

module.exports = {
  signup,
  signin,
};
