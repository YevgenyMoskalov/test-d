const express = require('express');
const middleware = require('../config/middleware');
const routes = require('../config/router');

const app = express();
const port = process.env.PORT || 5000;

middleware.init(app);
routes.init(app);
app.set('port', port);

module.exports = app;
