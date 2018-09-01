const Joi = require('joi');
Joi.objectId =  require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const userProfile = require('../models/userModel');

const CandidateProfile = mongoose.model('CandidateProfile', new mongoose.Schema({
    userId:{
      type: String,
      required: true,
      unique: true
    },
    email:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    fatherHusbandName:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    cnic: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    dob: {
        type: Date,
        require: true
    },
    gender:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    maritalStatus:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    mobilePhone:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    homePhone:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    positionApplied:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    currentAddress:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    permanentAddress:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
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

function validateCandidate(candidate) {
    const schema = {
        userId: Joi.objectId().required(),
        fullName: Joi.string().min(1).max(255).required(),
        fatherHusbandName: Joi.string().min(1).max(255).required(),
        cnic: Joi.string().min(1).max(50).required(),
        dob: Joi.date().required(),
        gender: Joi.string().min(1).max(50).required(),
        maritalStatus: Joi.string().min(1).max(50).required(),
        mobilePhone: Joi.string().min(1).max(50).required(),
        homePhone: Joi.string().min(1).max(50).required(),
        positionApplied: Joi.string().min(1).max(255).required(),
        currentAddress: Joi.string().min(1).max(500).required(),
        permanentAddress: Joi.string().min(1).max(500).required()
    };

    return Joi.validate(candidate, schema);
}

module.exports.CandidateProfile = CandidateProfile;
module.exports.validate = validateCandidate;