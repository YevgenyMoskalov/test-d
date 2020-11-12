const express = require('express');
const http = require('http');
const UserRouter = require('../components/User/router');
const ImageRouter = require('../components/Image/router');

module.exports = {
  init(app) {
    const router = express.Router();
    app.use(UserRouter);
    app.use(ImageRouter);
    app.use((req, res) => {
      res.status(404).send(http.STATUS_CODES[404]);
    });
    app.use(router);
  },
};
