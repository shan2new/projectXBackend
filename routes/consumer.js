const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");

router.get("/:identifierId", async (req, res) => {
  try {
    const consumerData = await (await Consumer.findOne({ identifierId: req.params.identifierId, }));
    const keys = ['name', 'identifierId', 'email']
    const consumer = Object.keys(consumerData.toJSON())
      .filter(key => keys.includes(key))
      .reduce((obj, key) => {
        obj[key] = consumerData[key];
        return obj;
      }, {})
    res.status(201).json(consumer);
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { name, phoneNumber, address, email, identifierId } = req.body;

    if (await Consumer.findOne({ email })) {
      throw new Error("Email Already Exist");
    } else if (await Consumer.findOne({ identifierId })) {
      throw new Error("Consumer Already Exist");
    }

    const newConsumer = new Consumer({
      name,
      phoneNumber,
      address,
      email,
      identifierId
    });

    const consumerData = await newConsumer.save();
    res.status(201).json(consumerData);
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

module.exports = router;
