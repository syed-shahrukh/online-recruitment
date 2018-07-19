const {CandidateReference, validate} = require('../models/candidateReferenceModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const referenceInfo = await CandidateReference.find();
  res.send(referenceInfo);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let referenceInfo = new CandidateReference(
    {
        userId: req.body.userId,
        name: req.body.name,
        relationship: req.body.relationship,
        phone: req.body.phone,
        yearsKnown: req.body.yearsKnown,
        notified: req.body.notified
    });

  await referenceInfo.save();

  res.send(referenceInfo);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const referenceInfo = await CandidateReference.findByIdAndUpdate(req.params.id, 
    { 
        name: req.body.name,
        relationship: req.body.relationship,
        phone: req.body.phone,
        yearsKnown: req.body.yearsKnown,
        notified: req.body.notified
    }, {
    new: true
  });

  if (!referenceInfo) return res.status(404).send('The candidate reference information with the given ID was not found.');
  
  res.send(referenceInfo);
});

router.delete('/:id', async (req, res) => {
  const referenceInfo = await CandidateReference.findByIdAndRemove(req.params.id);

  if (!referenceInfo) return res.status(404).send('The candidate reference information with the given ID was not found.');

  res.send(referenceInfo);
});

router.get('/:id', async (req, res) => {
  const referenceInfo = await CandidateReference.findById(req.params.id);

  if (!referenceInfo) return res.status(404).send('The candidate reference information with the given ID was not found.');

  res.send(referenceInfo);
});

module.exports = router;