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

    const { name, userName, password, email, phoneNumber, role } = request.body;

    console.log(await User.find({ userName }))

    if (await User.findOne({ userName })) {
      throw new Error('userName Already Exist');
    } else if (await User.findOne({ phoneNumber })) {
      throw new Error('phoneNumber Already Exist');
    } else if (email && await User.findOne({ email })) {
      throw new Error('email already Exist');
    }

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




