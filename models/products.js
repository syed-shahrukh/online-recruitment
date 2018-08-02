const mongoose = require('mongoose');
const Joi = require('joi');

const Products = mongoose.model('Products', new mongoose.Schema({
    
    name: {
       type:String,
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Answer', 
       required: true
    },
    
}));

module.exports.Products = Products;