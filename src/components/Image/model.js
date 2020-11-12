const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const operationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  parameters: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = connections.model('Operation', operationSchema);
