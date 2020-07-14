const mongoose = require('mongoose');

let link = "mongodb://localhost/projectX";

let connect = (callback) => {
    mongoose.connect(link, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB conected ...")
        callback();
    })
    .catch(err => console.log(err));
}

module.exports = connect