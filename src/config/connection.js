const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://lesnoy:0661295391_As@cluster0.lyore.mongodb.net/Cluster0?retryWrites=true&w=majority';

const connectOptions = {

  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
