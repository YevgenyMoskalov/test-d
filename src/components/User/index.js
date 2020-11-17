const jwt = require('jsonwebtoken');
const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const Token = require('../Auth/token');

async function signup(req, res) {
  try {
    const { error } = UserValidation.create(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const user = await UserService.signup(req.body);
    const tokens = await UserService.updatesTokens(user._id);
    res.status(201).json({
      tokens,
      message: 'user created',
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      err,
    });
  }
}

async function signin(req, res) {
  try {
    const { error } = UserValidation.signin(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }
    const user = await UserService.signin(req.body);
    const tokens = await UserService.updatesTokens(user._id);
    res.status(200).json({
      tokens,
      user,
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      err,
    });
  }
}

function refreshTokens(req, res) {
  try {
    const { refreshToken } = req.body;
    const payload = jwt.verify(refreshToken, process.env.SECRET_KEY);
    if (payload.type !== 'refresh') {
      res.status(400).json({
        message: 'Invalid token!',
      });
    }
    Token.findOne({ tokenId: payload.id })
      .exec()
      .then((token) => {
        if (token === null) {
          throw new Error('Invalid token');
        }
        return UserService.updatesTokens(token.userId);
      });
  } catch (e) {
    res.status(400).json({
      message: 'Invalid token!',
    });
  }
}

async function resetPassword(req, res) {
  try {
    await UserService.resetPassword(req.body.email);
    res.status(200).json({
      message: 'Sent!',
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      err,
    });
  }
}

async function logout(req, res) {
  try {
    await UserService.logout();
    res.status(200).json({
      message: 'logOut',
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      err,
    });
  }
}
module.exports = {
  signup,
  signin,
  resetPassword,
  logout,
  refreshTokens,
};
