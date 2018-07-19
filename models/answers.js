const Joi = require('joi');
const mongoose = require('mongoose');

const Answer = mongoose.model('Answer', new mongoose.Schema({
    ans_text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000
    },
    questionId: {
        type: String,
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
