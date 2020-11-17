const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const tokenSchema = new Schema({
  tokenId: String,
  userId: String,
});

module.exports = connections.model('Token', tokenSchema);
