const Joi = require('joi');
const mongoose = require('mongoose');

const Section = mongoose.model('Section', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500
    },
    description: {
        type: String,
        maxlength: 2000,
        default: ""
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

function validateSection(section) {
    const schema = {
        name: Joi.string().min(1).required(),
        description: Joi.string().allow('').max(2000)
    };

    return Joi.validate(section, schema);
}

module.exports.Section = Section;
module.exports.validate = validateSection;
