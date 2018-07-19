const Joi = require('joi');
Joi.objectId =  require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const CandidateReference = mongoose.model('CandidateReference', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    relationship:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    phone: {
        type: Date,
        required: true,
    },
    yearsKnown: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    notified:{
        type: Boolean,
        required: true,
        default: false
    },
    dateCreated: {
        type: Date,
        require: true,
        default: Date.now
    },
    dateModified: {
        type: Date
    }
}));

function validateCandidateReference(candidateReference) {
    const schema = {
        userId: Joi.objectId().required(),
        name: Joi.string().min(1).max(255).required(),
        relationship: Joi.string().min(1).max(255).required(),
        phone: Joi.date().required(),
        yearsKnown: Joi.string().min(1).max(50).required(),
        notified: Joi.boolean().required()
    };

    return Joi.validate(candidateReference, schema);
}

module.exports.CandidateReference = CandidateReference;
module.exports.validate = validateCandidateReference;