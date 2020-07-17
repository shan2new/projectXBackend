const express = require('express');
const app = express();
const connectDB = require('./db');
const cors = require('cors');
const userRouter = require('./routes/User');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/orders', require('./routes/Order'));
app.use('/users', userRouter);
app.use('/products', require('./routes/products'))

app.get('/', (req, res) => res.send('Welcome to API'));

connectDB(() => app.listen(port, () => console.log(`Listening on ${port} port`)));