const express = require('express');
const bodyParser = require('body-parser');
// const router = require('./api/v1/users/user.routes');
const connectDB = require('./db');
const cors = require('cors');
const userRouter = require('./routes/User');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/orders', require('./routes/Order'));
app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.send('Welcome to API');
});

connectDB(() => {
  app.listen(8080, () => console.log("Listening on 8080 port"));
});