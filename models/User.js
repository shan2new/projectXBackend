const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    "name": {
      type: String
    },
    "userName": {
      type: String,
      required: true,
      unique: true
    },
    "password": {
      type: String,
      required: true
    },
    "email": {
      type: String
    },
    "phoneNumber": {
      type: Number,
      required: true,
      unique: true
    },
    "role": {
      type: String,
      enum: ['Producer', 'Consumer'],
    },
  },
  {
    "timestamps": { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

module.exports = mongoose.model('User', User);
