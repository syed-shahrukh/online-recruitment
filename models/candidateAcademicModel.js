const Joi = require('joi');
Joi.objectId =  require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const CandidateAcademic = mongoose.model('CandidateAcademic', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    institute: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    subject:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    yearEnrolled: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    yearGraduated: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    degree:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    grades:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    major:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
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

function validateCandidateAcademic(candidateAcademic) {
    const schema = {
        userId: Joi.objectId().required(),
        institute: Joi.string().min(1).max(255).required(),
        subject: Joi.string().min(1).max(255).required(),
        yearEnrolled: Joi.string().min(1).max(50).required(),
        yearGraduated: Joi.string().min(1).max(50).required(),
        degree: Joi.string().min(1).max(50).required(),
        grades: Joi.string().min(1).max(50).required(),
        major: Joi.string().min(1).max(50).required()
    };

    return Joi.validate(candidateAcademic, schema);
}

module.exports.CandidateAcademic = CandidateAcademic;
module.exports.validate = validateCandidateAcademic;