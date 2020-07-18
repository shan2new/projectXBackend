const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/products", require("./routes/products"));
app.use("/consumer", require("./routes/consumer"));
app.use("/producer", require("./routes/producer"));
app.use("/order", require("./routes/order"));

app.get("/", (req, res) => res.send("Welcome to API"));

connectDB(() => app.listen(port, () => console.log(`Listening on ${port} port`)));
