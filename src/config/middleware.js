require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const UserIdError = require('../error/UserIdentificationError');

function init(app) {
  console.log(process.env.SECRET_KEY);
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
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload.type !== 'access') {
      res.status(401).json({
        message: 'Invalid token',
      });
    }
    const { userId } = payload.userId;
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

module.exports = {
  auth,
  init,
};
