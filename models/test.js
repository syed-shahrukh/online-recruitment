const mongoose = require('mongoose');
const Section = require('./sections');

const Test = mongoose.model('Test', new mongoose.Schema({
    test: {
        type: Array,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
}));


module.exports.Test = Test;