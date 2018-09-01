const _ = require('lodash');
const { Question, validate } = require('../models/questions');
const { Answer } = require('../models/answers');
const { Test } = require('../models/test');
const { Section } = require('../models/sections');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
  let data = [] // Empty array initialization to store the final Test Array
  
  let sections = await Section.aggregate(
    [{ $sample: { size: 3 } }]            // get all the sections from the sections collection
  , function(err, result) {
    if(err){
      console.log("Error Occurred " + err);
    }
    
    console.log(result);
  }   );

  for (let i = 0; i < sections.length; i++) {   //Outer loop to loop through all the sections
    let _section = {
        "id": sections[i]._id,
        "name": sections[i].name,
        "questions": []
      }
    let questions = await Question.find({ sectionId: sections[i]._id}); // Get all questions whose sectionId 
    _questions = [];
    for (let j = 0; j < questions.length; j++) {                      //matches the cuurent id of the Section in the loop
      _question = {
        "id": questions[i]._id,
        "questionText": questions[i].questionText,
        "answers": []
      };
      let answers = await Answer.find({ questionId: questions[j]._id});  // Get all answers whose questionId
      
      _question.answers = _.map(answers, answer => {                     //matches the cuurent id of the Question in the loop
        return {
          "id": answer.id,
          "ans_text": answer.ans_text,
          "isCorrect": answer.isCorrect
        }
      })

      _questions.push(_question)

    } // End of nested loop j
    _section.questions = _questions
    data.push(_section)
  } //End of Root Loop i
  await new Test({test:data, userId:"5b544486909be43c18373bdd"}).save();
  return res.send(data);

});



module.exports = router;