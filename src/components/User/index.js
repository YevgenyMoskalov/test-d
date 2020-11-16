const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const { tokenGeneration } = require('../../config/middleware');

async function signup(req, res) {
  try {
    const { error } = UserValidation.create(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const user = await UserService.signup(req.body);
    const token = tokenGeneration(user);
    res.status(201).json({
      token,
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
    const token = tokenGeneration(user);
    res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      err,
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
module.exports = {
  signup,
  signin,
  resetPassword,
};
