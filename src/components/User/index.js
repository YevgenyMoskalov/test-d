const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserService = require('./service');

const TOKEN_LIFETIME = '24h'; // 1 day
const SECRET_KEY = require('../config/jwt').SECRET_JWT;

async function signup(req, res, next) {
  try {

  } catch (error) {
    next(error);
  }
}

async function signin(req, res, next) {
  try {

  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
};
