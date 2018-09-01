const Joi = require('joi');
const mongoose = require('mongoose');
// const {Answer} = require('../models/answers');

const Question = mongoose.model('Question', new mongoose.Schema({
    questionText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000
    },
    answerdetails: {
       type:Array,
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Answer', 
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
//      type: mongoose.Schema.Types.ObjectId,
        // ref: 'Section',
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
        answerdetails: Joi.array().items(Joi.object().keys({
            ans_text: Joi.string().min(1).max(1000).required(),
            isCorrect: Joi.boolean().required()
        })).min(1).required(),
        imagePath: Joi.any()
    };

    return Joi.validate(question, schema);
}

module.exports.Question = Question;
module.exports.validate = validateQuestion;