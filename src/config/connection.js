const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://lesnoy:0661295391_As@cluster0.lyore.mongodb.net/Cluster0?retryWrites=true&w=majority';

const connectOptions = {
  // automatically try to reconnect when it loses connection
  autoReconnect: true,
  // reconnect every reconnectInterval milliseconds
  // for reconnectTries times
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  // flag to allow users to fall back to the old
  // parser if they find a bug in the new parse
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
