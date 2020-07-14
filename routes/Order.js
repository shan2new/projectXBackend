const router = require('express');
const Order = require('../models/Order');
const orderRouter = new router();

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
        const {productName, producerID, consumerID, address} = req.body;
        const order = new Order({
            productName, producerID, consumerID, address
        });
        const orderData = await order.save();
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
         res.status(201).json(order);
    } catch (e) {
        res.status(500).json({
            type: 'Error',
            name: e.name,
            message: e.message
      });
    }
  });

  module.exports = orderRouter