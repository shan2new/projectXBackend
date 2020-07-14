const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    "productName":{
        type: String
    },
    "producerID":{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    "consumerID":{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    "address":{
        type: String,
        required: true
    },
    "status":{
        type: String,
        enum: ['Pending', 'Accepted', 'On Way', 'Delivered', 'Rejected'],
        default : 'Pending'
    }
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

module.exports = mongoose.model('Order', Order);