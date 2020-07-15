const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    "name": {
      type: String
    },
    "userName": {
      type: String,
      required: true
    },
    "password": {
      type: String,
      required: true
    },
    "email": {
      type: String,
      validate: {
        validator: (v) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    "phoneNumber": {
      type: String,
      required: true,
      validate: {
        validator: (v) => {
          return /^[9][1]\d{10}$/.test(v);
        },
        message: props => `phone number should be in format 91XXXXXXXXXX`
      }
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
