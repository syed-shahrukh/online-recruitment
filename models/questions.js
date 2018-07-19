const Joi = require('joi');
const mongoose = require('mongoose');

const Question = mongoose.model('Question', new mongoose.Schema({
    questionText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000
    },
    answer: {
        type:Array,
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
    sectionId: {
      type: String,
      required: true
    },
    imagePath: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}));

function validateQuestion(question) {
    const schema = {
        questionText: Joi.string().min(1).required(),
        sectionId: Joi.string().required(),
        answer: Joi.array().items(Joi.object().keys({
            answer: Joi.string().min(1).max(1000).required(),
            isCorrect: Joi.boolean().required()
        })).min(1).required()
    };

    return Joi.validate(question, schema);
}

module.exports.Question = Question;
module.exports.validate = validateQuestion;