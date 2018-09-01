const mongoose = require('mongoose');
const Section = require('./sections');

const Result = mongoose.model('Result', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sectionId:{
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    userChoice: {
        type: Array,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
}));


module.exports.Result = Result;