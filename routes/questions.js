const _ = require('lodash');
const {Question, validate} = require('../models/questions');
const {Answer} = require('../models/answers');
const {Orders} = require('../models/orders');
const {Products} = require('../models/products');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const questions = await Question.aggregate([
    { $lookup:
       {
         from: 'answers',
         localField: '_id',
         foreignField: 'questionId',
         as: 'answerdetails'
       }
     },
     { "$match": { isDeleted: false } }
    ]).sort('dateCreated');
  res.send(questions);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let question = new Question(_.pick(req.body, ['questionText', 'sectionId']));

  //save data in collection
  await question.save();
  
  let ans_Obj= req.body.answerdetails;
  Object.keys(ans_Obj).map( async function(key) {
    let answer = new Answer({
        ans_text: ans_Obj[key].ans_text,
        questionId: question._id,
        isCorrect: ans_Obj[key].isCorrect
    });

    /// save answers for given question ID
    await answer.save();
  });

  res.send(question);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  

  const question = await Question.findByIdAndUpdate(req.params.id, 
    { 
      questionText: req.body.questionText,
      answerdetails: req.body.answerdetails,
      sectionId: req.body.sectionId,
      dateModified: new Date()
    }, {
    new: true
  });
  
  /// need to update ans as well, if admin removes or updates any ans.
  ///left it for future implementation
  await Answer.find({questionId: req.params.id}).remove().exec(); //Removes Existing Answers for given Question
  let ans_Obj= req.body.answerdetails;
  Object.keys(ans_Obj).map( async function(key) {
    let answer = new Answer({
        ans_text: ans_Obj[key].ans_text,
        questionId: question._id,
        isCorrect: ans_Obj[key].isCorrect
    });

    /// save answers for given question ID
    await answer.save();
  });


  if (!question) return res.status(404).send('The question with the given ID was not found.');
  
  res.send(question);
});

router.delete('/:id', async (req, res) => {
  const question = await Question.findByIdAndUpdate(req.params.id, 
    { 
      isDeleted:true
    },{
      new:true
    });

  if (!question) return res.status(404).send('The question with the given ID was not found..');

  res.send(question);
});

router.get('/:id', async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) return res.status(404).send('The question with the given ID was not found.');

  res.send(question);
});

module.exports = router;