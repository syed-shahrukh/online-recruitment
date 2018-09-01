const _ = require('lodash');
const { Question, validate } = require('../models/questions');
const { Answer } = require('../models/answers');
const { Test } = require('../models/test');
const { Section } = require('../models/sections');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

  let questions = new Promise((resolve, reject) => {
              let timer = req.body.testTimer;
              let questions = Question.findOne({sectionId: {$eq: req.body.sectionId }, _id: {$nin: req.body.questionQueue}}); // Get all questions whose sectionId
              
               resolve(questions);                                      //matches the cuurent id of the Section in the loop
        
             }).then(questions => {

              let answer = new Promise ((resolve, reject) => {
              
                let answerdetails = Answer.find({questionId: questions._id});
              
                resolve(answerdetails);
              
              }).then(answerdetails => {
              
                questions.answerdetails = answerdetails;
              
                res.send(questions);
              
              });

                           
              }).catch(error => {
                res.send(error);
              });
  
});



module.exports = router;