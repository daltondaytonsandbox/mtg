const { Router } = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const Person = require('../models/person')
// require('../config/passport')

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

// ====================
// === Users Routes ===
// ====================

// Create - POST
router.post('/register', (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email
  })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      return res.redirect('register')
    }
    passport.authenticate('local')(req, res, () => {
      console.log('Success: ')
      console.log(user.firstName + ' ' + user.lastName)
    })
  })
  return res.redirect('/test')
})

// Log In
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('logged in')
  console.log(req.user)
  return res.redirect('/test')
})

// Read - GET
router.get('/users', function(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(users)
    }
  })
})

// Destroy - Delete
router.delete('/users/:id', (req, res, next) => {
  res.send(req.params.id)
  User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
  })
})

// ====================
// === People Routes ===
// ====================

// Create - POST
router.post('/people', function(req, res) {
  const newPerson = new Person(req.body)
  newPerson.save()
  res.status(201).send(newPerson)
})

// Read - GET
router.get('/people', function(req, res) {
  Person.find({}, (err, people) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(people)
    }
  })
})

// Update - PUT

// Destroy - DELETE
router.delete('/people/:id', (req, res, next) => {
  res.send(req.params.id)
  Person.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
  })
})

module.exports = router
