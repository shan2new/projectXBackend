const express = require('express');
const router = express.Router()
const fetch = require('node-fetch');

router.get('/list', async (req, res) => {
  let response = await fetch('https://developers.zomato.com/api/v2.1/categories', {
    method: 'get',
    headers: { 'user-key': process.env.API_KEY }
  });
  let data = await response.json();
  res.json(data);
});

module.exports = router;