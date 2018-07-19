const {CandidateProfessional, validate} = require('../models/candidateProfessionalModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const professionalInfo = await CandidateProfessional.find();
  res.send(professionalInfo);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let professionalInfo = new CandidateProfessional(
    {
        userId: req.body.userId,
        employer: req.body.employer,
        title: req.body.title,
        employmentDate: req.body.employmentDate,
        duration: req.body.duration,
        salaryStart: req.body.salaryStart,
        salaryFinal: req.body.salaryFinal,
        reason: req.body.reason,
        duties: req.body.duties
    });

  await professionalInfo.save();

  res.send(professionalInfo);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const professionalInfo = await CandidateProfessional.findByIdAndUpdate(req.params.id, 
    { 
        employer: req.body.employer,
        title: req.body.title,
        employmentDate: req.body.employmentDate,
        duration: req.body.duration,
        salaryStart: req.body.salaryStart,
        salaryFinal: req.body.salaryFinal,
        reason: req.body.reason,
        duties: req.body.duties
    }, {
    new: true
  });

  if (!professionalInfo) return res.status(404).send('The candidate professional information with the given ID was not found.');
  
  res.send(professionalInfo);
});

router.delete('/:id', async (req, res) => {
  const professionalInfo = await CandidateProfessional.findByIdAndRemove(req.params.id);

  if (!professionalInfo) return res.status(404).send('The candidate professional information with the given ID was not found.');

  res.send(professionalInfo);
});

router.get('/:id', async (req, res) => {
  const professionalInfo = await CandidateProfessional.findById(req.params.id);

  if (!professionalInfo) return res.status(404).send('The candidate professional information with the given ID was not found.');

  res.send(professionalInfo);
});

module.exports = router;