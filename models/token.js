const Joi = require('joi');
const mongoose = require('mongoose');

const Token = mongoose.model('Token', new mongoose.Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: { 
        type: String,
        required: true
     },
     createdAt: { 
         type: Date, 
         required: true, 
         default: Date.now, 
         expires: 43200
    }
}));



module.exports.Token = Token;

