/* eslint-disable no-console */
const { Router } = require('express')
const mongoose = require('mongoose')
const Models = require('../models/models')

const router = Router()

const db =
  'mongodb+srv://dalton:dalton@cluster0-ofsc3.mongodb.net/main?retryWrites=true&w=majority'

mongoose.connect(
  db,
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log('Failed to connected to ' + db)
    } else {
      console.log('Connected to ' + db)
    }
  }
)

/// /////////
/// CARDS ///
/// /////////

// GET
// router.get('/cards', function(req, res) {
//   Models.Card.find({}, (err, cards) => {
//     if (err) {
//       res.status(404).send(err)
//     } else {
//       console.log('success')
//       res.status(200).send(cards)
//     }
//   })
// })

/// /////////
/// USERS ///
/// /////////

// GET
router.get('/users', function(req, res) {
  Models.User.find({}, (err, users) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(users)
    }
  })
})

// POST
router.post('/users', function(req, res) {
  const User = new Models.User(req.body)
  User.save()
  res.status(201).send(User)
})

// UPDATE
// router.put()

// DESTROY
router.delete('/users/:id', (req, res, next) => {
  res.send(req.params.id)
  Models.User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
  })
})

module.exports = router
