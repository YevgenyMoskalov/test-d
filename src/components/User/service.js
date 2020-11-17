const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('./repository');
const UserError = require('../../error/UserAuthError');
const UserMailer = require('./mailer');
const authHelper = require('../../helpers/authHelper');

function signup(user) {
  const userEmail = user.email;
  const userName = user.name;
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

async function updatesTokens(userId) {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();
  await authHelper.replaceRefreshToken(refreshToken.id, userId);
  return {
    accessToken,
    refreshToken: refreshToken.token,
  };
}
module.exports = {
  signup,
  signin,
  resetPassword,
  updatesTokens,
};
