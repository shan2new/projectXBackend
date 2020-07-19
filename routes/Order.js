const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Producer = require("../models/Producer");
const request = require("request");
const Consumer = require("../models/Consumer");

router.get("/:orderId", async (req, res) => {
  try {
    const orderData = await Order.findById(req.params.orderId);
    res.status(200).json(orderData);
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      itemName,
      consumerID,
      producerID,
      deliveryAddress,
      status,
    } = req.body;

    const newOrder = new Order({
      itemName,
      consumerID,
      producerID,
      deliveryAddress,
      status,
    });

    newOrder.save()
      .then(() => {
        Producer.findById(newOrder.producerID)
          .then(record => {
            record.orderQueue.push(newOrder._id);
            record.save()
              .then(() => {
                const msg = `Hi there! You have received an order for ${newOrder.itemName}.`;
                sendNotification(newOrder.producerID, msg);
                res.json(newOrder);
              })
          })
      })
      .catch(e => {
        console.log('Unable to create order');
        res.status(500).json({
          type: "Error",
          name: e.name,
          message: e.message,
        });
      });
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

router.put("/:orderId/status/:st", async (req, res) => {
  try {
    let orderData = await Order.findById(req.params.orderId);
    if (!orderData) {
      throw new Error("No Order Found");
    }
    orderData.status = req.params.st;
    const order = await orderData.save();
    // sendNotification;
    res.status(201).json(order);
  } catch (e) {
    res.status(500).json({
      type: "Error",
      name: e.name,
      message: e.message,
    });
  }
});

async function sendNotification(producerID, message) {
  let producer = await Producer.findById(producerID).select({
    _id: 0,
    phoneNumber: 1,
  });
  let obj = {
    from: { type: "whatsapp", number: "14157386170" },
    to: { type: "whatsapp", number: producer["phoneNumber"] },
    message: {
      content: {
        type: "text",
        text: message,
      },
    },
  };
  console.log(producer["phoneNumber"]);
  request(
    {
      url: "https://messages-sandbox.nexmo.com/v0.1/messages",
      method: "POST",
      json: true, // <--Very important!!!
      headers: {
        Authorization: process.env.AUTH, // <--Very important!!!
      },
      body: obj,
    },
    (error, response, body) => {
      if (error) console.log(error);
      else console.log("Sent notification");
    }
  );
}

module.exports = router;
