const _ = require('lodash');
const { Question, validate } = require('../models/questions');
const { Result } = require('../models/testresult');
const { Answer } = require('../models/answers');
const { Test } = require('../models/test');
const { Section } = require('../models/sections');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/getSectionDetails/:sectionId', async (req, res) => {
 
    let details = new Promise((resolve, reject) => {
        let details = Result.find({sectionId: req.params.sectionId});
        resolve(details);
    }).then(details => {
        res.send(details);
    });

});

router.get('/:id/:sectionId', async (req, res) => {
 
       let attemptDate = await Result.findOne({userId: req.params.id});    
        
        let totalQuestions =  await Result.find({userId: req.params.id, sectionId: req.params.sectionId}).count();
        let answers = await Result.find({userId: req.params.id, sectionId: req.params.sectionId, isCorrect: true}).count();
        console.log(totalQuestions);
        console.log(answers);
        let data = {
            date: attemptDate.dateCreated,
            totalQuestions: totalQuestions,
            sectionId: req.params.sectionId,
            correctAnswers: answers
        }
        res.send(data);

});
router.post('/savequestion', async(req, res) => {
    
    
    console.log(req.body);
     let result = new Promise ((resolve, reject) => {
        
        let result = new Result(_.pick(req.body, ['userId', 'sectionId','questionId','questionText','options','answers','userChoice', 'isCorrect']));   
        
        resolve (result);
    
    }).then(result => {
        //save data in collection
        result.save();
        res.send(result);
    })
     
  
     
    
    
    
  
     

});



module.exports = router;