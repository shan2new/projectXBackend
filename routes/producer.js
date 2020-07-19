const express = require("express");
const Producer = require("../models/Producer");
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const producers = await Producer.find();
    const keys = ['_id', 'name', 'thumb', 'featured_image', 'cuisines', 'average_cost_for_two']
    let producersList = [];
    for (let producer of producers) {
      producersList.push(Object.keys(producer.toJSON())
        .filter(key => keys.includes(key))
        .reduce((obj, key) => {
          obj[key] = producer[key];
          return obj;
        }, {}));
    }
    res.json(producersList);
  } catch (e) {
    console.log('Unable to retrieve producers');
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { name, phoneNumber, address, email, cuisines, average_cost_for_two, thumb, featured_image } = req.body;
    if (await Producer.findOne({ phoneNumber }) || await Producer.findOne({ email })) {
      throw new Error("Producer is Already Registered");
    }
    const newProducer = new Producer({
      name,
      phoneNumber,
      address,
      email,
      cuisines,
      average_cost_for_two,
      thumb,
      featured_image
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
