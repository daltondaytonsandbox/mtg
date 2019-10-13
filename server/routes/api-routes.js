/* eslint-disable no-console */
const { Router } = require('express')
const mongoose = require('mongoose')
const Model = require('../models/models')

const router = Router()

const db = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(db, { useFindAndModify: false }, (err, res) => {
  if (err) {
    console.log('Failed to connected to ' + db)
  } else {
    console.log('Connected to ' + db)
  }
})

// GET
router.get('/users', function(req, res) {
  Model.find({}, (err, users) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(users)
    }
  })
})

// POST
router.post('/users', function(req, res) {
  const User = new Model(req.body)
  User.save()
  res.status(201).send(User)
})

// UPDATE

// DESTROY
router.delete('/users/:id', (req, res, next) => {
  res.send(req.params.id)
  Model.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
  })
})

module.exports = router
