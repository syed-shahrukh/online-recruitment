const Joi = require('joi');
const mongoose = require('mongoose');
//const {Question, validate} = require('../models/questions');

const Answer = mongoose.model('Answer', new mongoose.Schema({
    ans_text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000
    },
    questionId: {
        //type: String,
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Question',
        required: true
    },
    dateCreated: {
        type: Date,
        require: true,
        default: Date.now
    },
    dateModified: {
        type: Date
    },
    isCorrect: {
        type: Boolean
    }
}));

module.exports.Answer = Answer;
