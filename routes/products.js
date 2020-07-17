const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/list", async (req, res) => {
  let res_id = [
    18494129,
    18674420,
    18531910,
    18735687,
    18357341,
    39692,
    36267,
    36272,
    16538641,
  ];
  let ar = [];
  for (let i = 0; i < res_id.length; i++) {
    let querystring =
      "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + res_id[i];
    let promise = fetch(querystring, {
      method: "get",
      headers: { "user-key": process.env.API_KEY },
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
    ar.push(promise);
  }
  Promise.all(ar).then((results) => {
    let arr = [];
    for (let i = 0; i < results.length; i++) {
      arr.push(results[i]);
    }
    res.json({ restaurants: arr });
  });
});

module.exports = router;
