require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const UserIdError = require('../error/UserIdentificationError');

const { SECRET_TOKEN, TOKEN_LIFETIME } = process.env;

function init(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(fileUpload({ createParentPath: true }));
  app.use(helmet());
  app.use(cors());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,'
            + ' Content-Type, Accept,'
            + ' Authorization,'
            + ' Access-Control-Allow-Credentials',
    );
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
  });
}

function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, SECRET_TOKEN);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw new UserIdError('Invalid user ID');
    }
    next();
  } catch (error) {
    console.error(error.stack);
    res.status(401).json({
      error,
    });
  }
}

function tokenGeneration(user) {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign({ userId: user._id }, SECRET_TOKEN, { expiresIn: TOKEN_LIFETIME });
}

module.exports = {
  auth,
  init,
  tokenGeneration,
};
