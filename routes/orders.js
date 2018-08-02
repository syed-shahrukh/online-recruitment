const {Orders} = require('../models/orders');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const orders = await Orders.find().sort('dateCreated');
  //  const questions = await Question.aggregate([
  //   { $lookup:
  //      {
  //        from: 'answers',
  //        localField: '_id',
  //        foreignField: 'questionId',
  //        as: 'answerdetails'
  //      }
  //    }
  //   ]).toArray(function(err, res) {
  //     if (err) throw err;
  //     console.log(JSON.stringify(res));
  //   });;
    //const answers = await Answer.find().sort('dateCreated');
    
  
    res.send(orders);
  });

  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let orders = new Orders(req.body, ['name', 'sectionId']);
  
    //save data in collection
    await orders.save();
  
    res.send(orders);
  });