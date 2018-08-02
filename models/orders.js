const mongoose = require('mongoose');
const Joi = require('joi');

const Orders = mongoose.model('Orders', new mongoose.Schema({
    
    name: {
       type:String,
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Answer', 
       required: true
    },
    
}));

module.exports.Orders = Orders;