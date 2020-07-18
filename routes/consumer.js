const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");

router.get("/:phoneNumber", async (req, res) => {
  try {
    const consumerData = await Consumer.findOne({
      phoneNumber: req.params.phoneNumber,
    });
    res.status(201).json(consumerData);
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

router.post("/new", async (req, res) => {
  console.log("Inside consumer post api");
  try {
    const { name, phoneNumber, address, email } = req.body;

    if (await Consumer.findOne({ phoneNumber })) {
      throw new Error("phoneNumber Already Exist");
    } else if (await Consumer.findOne({ email })) {
      throw new Error("email already Exist");
    }
    const newConsumer = new Consumer({
      name,
      phoneNumber,
      address,
      email,
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
