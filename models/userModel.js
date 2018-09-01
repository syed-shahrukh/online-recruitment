const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:1,
        maxlength:255
    },
    email: {
      type: String,
      required: true,
      unique:true,
      minlength: 1,
      maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        require: true,
        default: Date.now
    },
    dateModified: {
        type: Date
    },
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(8).required()
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;

