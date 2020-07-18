const express = require("express");
const Producer = require("../models/Producer");
const router = express.Router();


router.post("/new", async (req, res) => {
  console.log("Creating new Producer");
  try {
    const { name, phoneNumber, address, email } = req.body;
    if (await Producer.findOne({ phoneNumber }) || await Producer.findOne({ email })) {
      throw new Error("Producer is Already Registered");
    }
    const newProducer = new Producer({
      name,
      phoneNumber,
      address,
      email,
    });

    const producerData = await newProducer.save();
    res.status(201).json(producerData);
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

module.exports = router;
