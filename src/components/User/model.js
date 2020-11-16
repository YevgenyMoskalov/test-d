const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    require: true,
    default: 'user',
  },
});

module.exports = connections.model('User', userSchema);
