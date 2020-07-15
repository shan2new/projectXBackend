const router = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const orderRouter = new router();
const request = require('request');

orderRouter.get('/:orderId', async (req, res) => {
  try {
    const orderData = await Order.findById(req.params.orderId);
    res.status(200).json(orderData);
  } catch (e) {
    res.status(500).json({
      type: 'Error',
      name: e.name,
      message: e.message
    });
  }
});

orderRouter.post('/new', async (req, res) => {
  try {
    const { productName, producerID, consumerID, address } = req.body;
    const order = new Order({
      productName, producerID, consumerID, address
    });
    const orderData = await order.save();
    const msg = "Hi there! You have received an order. Please have a look at it.";
    sendNotification(producerID, msg);
    res.status(201).json(orderData);
  } catch (e) {
    res.status(500).json({
      type: 'Error',
      name: e.name,
      message: e.message
    });
  }
});

orderRouter.put('/:orderId/status/:st', async (req, res) => {
  try {
    let orderData = await Order.findById(req.params.orderId);
    if (!orderData) {
      throw new Error('No Order Found');
    }
    orderData.status = req.params.st;
    const order = await orderData.save();
    sendNotification;
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({
      type: 'Error',
      name: e.name,
      message: e.message
    });
  }
});

async function sendNotification(producerID, message) {
  let producer = await User.findById(producerID).select({"_id" : 0,"phoneNumber" : 1});
  let obj = {
    "from": { "type": "whatsapp", "number": "14157386170" },
    "to": { "type": "whatsapp", "number": producer['phoneNumber'] },
    "message": {
      "content": {
      "type": "text",
      "text": message
    }
  }};
  request({
    url: "https://messages-sandbox.nexmo.com/v0.1/messages",
    method: "POST",
    json: true,   // <--Very important!!!
    headers: {
      "Authorization": process.env.AUTH,  // <--Very important!!!
    },
    body: obj
  }, (error, response, body) => {
    if(error)
      console.log(error);
    else
      console.log("Sent notification");
  });
}

module.exports = orderRouter