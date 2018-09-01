const {CandidateProfile, validate} = require('../models/candidateProfileModel');
const mongoose = require('mongoose');
const objectId = require('mongoose').Types.ObjectId;
const users = require('../models/userModel');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  //const candidates = await CandidateProfile.find();
  let candidates = await CandidateProfile.aggregate([{
    $lookup:{
      from: 'users',
         localField: 'userId',
         foreignField: '_id',
         as: 'email'
    }
    
  },
  {
    "$unwind": "$email"
  },
  {
    "$project": {
      "_id": 1,
      "email.email": 1,
      "userId": 1,
      "fullName": 1,
      "mobilePhone": 1,
      "positionApplied": 1,
      "gender": 1
    }
  }
]);

  res.send(candidates);
});

router.get('/:id', async (req, res) => {
  const id = new objectId(req.params.id);
  const candidates = await CandidateProfile.aggregate(
    [
      {
        $match:{ userId: id}
      },
      // {
      //   "$project": {
      //     "_id": 1,
      //     "fullName": 1,
      //     "fatherHusbandName": 1,
      //     "cnic": 1,
      //     "userId": 1,
          
      //     "mobilePhone": 1,
      //     "positionApplied": 1,
      //     "gender": 1
      //   }
      // }
    ]
  );
  
  res.send(candidates);
  
});



router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let candidate = new CandidateProfile(
    {
      userId: req.body.userId,  
      fullName: req.body.fullName,
      fatherHusbandName: req.body.fatherHusbandName,
      cnic: req.body.cnic,
      dob: req.body.dob,
      gender: req.body.gender,
      maritalStatus: req.body.maritalStatus,
      mobilePhone: req.body.mobilePhone,
      homePhone: req.body.homePhone,
      positionApplied: req.body.positionApplied,
      currentAddress: req.body.currentAddress,
      permanentAddress: req.body.permanentAddress
    });

  await candidate.save();

  res.send(candidate);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const candidate = await CandidateProfile.findByIdAndUpdate(req.params.id, 
    { 
        fullName: req.body.fullName,
        fatherHUsbandName: req.body.fatherHUsbandName,
        cnic: req.body.cnic,
        dob: req.body.dob,
        gender: req.body.gender,
        maritalStatus: req.body.maritalStatus,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        positionApplied: req.body.positionApplied,
        currentAddress: req.body.currentAddress,
        permanentAddress: req.body.permanentAddress,
    }, {
    new: true
  });

  if (!candidate) return res.status(404).send('The candidate with the given ID was not found.');
  
  res.send(candidate);
});

router.delete('/:id', async (req, res) => {
  const candidate = await CandidateProfile.findByIdAndRemove(req.params.id);

  if (!candidate) return res.status(404).send('The candidate with the given ID was not found.');

  res.send(candidate);
});

router.get('/:id', async (req, res) => {
  const candidate = await CandidateProfile.findById(req.params.id);

  if (!candidate) return res.status(404).send('The candidate with the given ID was not found.');

  res.send(candidate);
});

module.exports = router;