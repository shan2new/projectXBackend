const express = require("express");
const router = express.Router();
const Producer = require("../models/Producer");
const Products = require("../models/Products");


router.get('/list/:producerId', async (req, res) => {
  const producers = await Producer.findById(req.params.producerId);
  let products = []
  for (let product of producers.products) {
    products.push(Products.findById(product));
  }
  Promise.all(products)
    .then(data => res.json(data))
    .catch(e => {
      console.log(e)
      res.status(500).json({
        type: "Error",
        name: e.name,
        message: e.message,
      });
    });
});

router.post('/add', async (req, res) => {
  try {
    const { price, description, image, category, producedBy } = req.body;
    const newProduct = new Products({
      price,
      description,
      image,
      category,
      producedBy,
    });

    await newProduct.save();
    const assignedProducer = await Producer.findById(newProduct.producedBy);
    assignedProducer.products.push(newProduct);
    await assignedProducer.save();
    await Producer.findById(newProduct.producedBy);
    res.json(newProduct);
  } catch (e) {
    console.log('Unable to Add Product');
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

module.exports = router;