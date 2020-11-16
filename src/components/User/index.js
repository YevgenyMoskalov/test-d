const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const { tokenGeneration } = require('../../config/middleware');

async function signup(req, res, next) {
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
  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
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
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
};
