const http = require('http');
const events = require('./events');
const server = require('./server');

const port = process.env.PORT || 5000;

events.bind(http.createServer(server).listen(port), port);
