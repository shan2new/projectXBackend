const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.get('/:userName', async (request, response) => {
  try {
    const userData = await User.findOne({ userName: request.params.userName })
    response.status(201).json(userData);
  } catch (error) {
    response.status(500).json({
      type: 'Error',
      name: error.name,
      message: error.message
    });
  }
});

router.post('/create', async (request, response) => {
  try {
    const userEmail = await User.findOne({ email: request.body.email })
    if (userEmail) {
      throw new Error('Email Address already exist');
    }
    const { name, userName, password, email, phoneNumber, role } = request.body;
    const newUser = new User({ name, userName, password, email, phoneNumber, role });
    const userData = await newUser.save();
    response.status(201).json(userData);
  } catch (error) {
    response.status(500).json({
      type: 'Error',
      name: error.name,
      message: error.message
    });
  }
})

module.exports = router




