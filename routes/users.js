const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/userModel');
const { Token } = require('../models/token');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/signup', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name','email', 'password']));
  user.password = await bcrypt.hash(user.password, 10);
  //save data in collection
  await user.save();
  //let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

  res.send(user);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, 
    { 
      email: req.body.email,
      password: req.body.password
    }, {
    new: true
  });

  if (!user) return res.status(404).send('The user with the given ID was not found.');
  
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.post('/login', async (req, res) => {
  
  let user = await User.findOne({email: req.body.email});
  if(user) {
    // comparing hash from DB.
    const match = await bcrypt.compare(req.body.password, user.password);
    if(match)
      return res.status(200).send(true);
    else
      return res.status(400).send('User with the given Email and Password was not found.');
  }
  else
    return res.status(400).send('User with the given Email was not found');
});

module.exports = router;