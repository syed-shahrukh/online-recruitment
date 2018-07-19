const {CandidateAcademic, validate} = require('../models/candidateAcademicModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const academicInfo = await CandidateAcademic.find();
  res.send(academicInfo);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let academicInfo = new CandidateAcademic(
    {
        userId: req.body.userId,
        institute: req.body.institute,
        subject: req.body.subject,
        yearEnrolled: req.body.yearEnrolled,
        yearGraduated: req.body.yearGraduated,
        degree: req.body.degree,
        grades: req.body.grades,
        major: req.body.major
    });

  await academicInfo.save();

  res.send(academicInfo);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const academicInfo = await CandidateAcademic.findByIdAndUpdate(req.params.id, 
    { 
        institute: req.body.institute,
        subject: req.body.subject,
        yearEnrolled: req.body.yearEnrolled,
        yearGraduated: req.body.yearGraduated,
        degree: req.body.degree,
        grades: req.body.grades,
        major: req.body.major
    }, {
    new: true
  });

  if (!academicInfo) return res.status(404).send('The candidate academic information with the given ID was not found.');
  
  res.send(academicInfo);
});

router.delete('/:id', async (req, res) => {
  const academicInfo = await CandidateAcademic.findByIdAndRemove(req.params.id);

  if (!academicInfo) return res.status(404).send('The candidate academic information with the given ID was not found.');

  res.send(academicInfo);
});

router.get('/:id', async (req, res) => {
  const academicInfo = await CandidateAcademic.findById(req.params.id);

  if (!academicInfo) return res.status(404).send('The candidate academic information with the given ID was not found.');

  res.send(academicInfo);
});

module.exports = router;