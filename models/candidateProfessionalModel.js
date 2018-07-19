const Joi = require('joi');
Joi.objectId =  require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const CandidateProfessional = mongoose.model('CandidateProfessional', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    employer: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    title:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    employmentDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    salaryStart:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    salaryFinal:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    reason:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    duties:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
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

function validateCandidateProfessional(candidateProfessional) {
    const schema = {
        userId: Joi.objectId().required(),
        employer: Joi.string().min(1).max(255).required(),
        title: Joi.string().min(1).max(255).required(),
        employmentDate: Joi.date().required(),
        duration: Joi.string().min(1).max(50).required(),
        salaryStart: Joi.string().min(1).max(50).required(),
        salaryFinal: Joi.string().min(1).max(50).required(),
        reason: Joi.string().min(1).max(500).required(),
        duties: Joi.string().min(1).max(500).required()
    };

    return Joi.validate(candidateProfessional, schema);
}

module.exports.CandidateProfessional = CandidateProfessional;
module.exports.validate = validateCandidateProfessional;