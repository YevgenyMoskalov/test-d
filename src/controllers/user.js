const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../components/User/model');

const TOKEN_LIFETIME = '24h'; // 1 day
const SECRET_KEY = require('../config/jwt').SECRET_JWT;

exports.signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    res.status(409).json({
      message: 'email already taken',
    });
  }
  if (await User.findOne({ name: req.body.name })) {
    res.status(409).json({
      message: 'name already taken',
    });
  }
  const user = await User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    role: 'user',
  }).then(() => {
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: TOKEN_LIFETIME });
    res.status(201).json({
      token,
      message: 'user created',
    });
  }).catch(() => {
    res.status(500).json({
      error: 'token error',
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(410).json({
        error: new Error('User not found!'),
      });
    }
    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if (!valid) {
        res.status(401).json({
          error: new Error('Wrong password!'),
        });
      }
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: TOKEN_LIFETIME });
      res.status(200).json({
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    }).catch((error) => {
      res.status(500).json({
        error,
      });
    });
  }).catch((error) => {
    res.status(500).json({
      error,
    });
  });
};
