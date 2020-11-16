const bcrypt = require('bcryptjs');
const UserRepository = require('./repository');
const UserError = require('../../error/UserAuthError');
const UserMailer = require('./mailer');

function signup(userData) {
  const userEmail = userData.email;
  const userName = userData.name;
  const userProfile = {
    email: userEmail,
    password: bcrypt.hashSync(userData.password, 10),
    name: userName,
  };
  return UserRepository.create(userProfile);
}

async function signin(authData) {
  const user = await UserRepository.findByEmail(authData.email);
  if (!user) {
    throw new UserError('User is not registered');
  }
  const valid = await bcrypt.compare(authData.password, user.password);
  if (!valid) {
    throw new UserError('Wrong password!');
  }
  return user;
}

function resetPassword(email) {
  // const user = UserRepository.findByEmail(email);
  UserMailer.sendMail(email);
  // to do
}
module.exports = {
  signup,
  signin,
  resetPassword,
};
