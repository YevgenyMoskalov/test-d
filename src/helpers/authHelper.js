const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');

const Token = require('../components/Auth/token');

function generateAccessToken(userId) {
  const payload = {
    userId,
    type: 'access',
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2m' });
}

function generateRefreshToken() {
  const payload = {
    id: uuid(),
    type: 'refresh',
  };
  return {
    id: payload.id,
    token: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '168h' }),
  };
}

async function replaceRefreshToken(tokenId, userId) {
  await Token.findOneAndRemove({ userId });
  await Token.create({ tokenId, userId });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceRefreshToken,
};
