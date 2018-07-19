const _ = require('lodash');
const {Section, validate} = require('../models/sections');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const sections = await Section.find().sort('name');
  res.send(sections);
});

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  
  if (error) return res.status(400).send(error.details[0].message);

  let section = new Section(_.pick(req.body, ['name', 'description']));
  
  //save data in collection
  await section.save();

  res.send(section);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const section = await Section.findByIdAndUpdate(req.params.id, 
    { 
      name: req.body.name,
      description: req.body.description
    }, {
    new: true
  });

  if (!section) return res.status(404).send('The section with the given ID was not found.');
  
  res.send(section);
});

router.delete('/:id', async (req, res) => {
  const section = await Section.findByIdAndRemove(req.params.id);

  if (!section) return res.status(404).send('The section with the given ID was not found.');

  res.send(section);
});

router.get('/:id', async (req, res) => {
  const section = await Section.findById(req.params.id);

  if (!section) return res.status(404).send('The section with the given ID was not found.');

  res.send(section);
});

module.exports = router;