const express = require('express');
const bodyParser = require('body-parser');
// const router = require('./api/v1/users/user.routes');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(cors());

// app.use('/', router);

app.get('/', (req,res) => {
    res.send('Welcome to API');
});

connectDB(() => {
    app.listen(8080, () => console.log("Listening on 8080 port"));
});