const { Router } = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const Task = require('../models/task')
const Card = require('../models/card')
const Secrets = require('../config/secrets')
// require('../config/passport')

const router = Router()

// Mongoose and MongoDB set up
const db =
  'mongodb+srv://dalton:' +
  Secrets.MONGO_PASSWORD +
  '@cluster0-ofsc3.mongodb.net/main?retryWrites=true&w=majority'

mongoose.connect(
  db,
  { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log('Failed to connect')
    } else {
      console.log('Connected to Mongo DB')
    }
  }
)

// ===================
// === Card Routes ===
// ===================

// Create - POST
// Add a card to logged in user's collection
router.post('/users', (req, res) => {
  const userID = req.user._id
  const cardID = req.body.params.cardID

  User.findByIdAndUpdate(
    userID,
    { $push: { cardCollection: cardID } },
    // { new: true },
    (err, user) => {
      if (err) {
        console.log('Error: ')
        console.log(err)
      }
    }
  )
  // add to collection array
})

// Read - GET
// Search DB for query
router.get('/cards', function(req, res) {
  Card.find(
    { name: { $regex: req.query.searchInput, $options: 'i' } },
    (err, cards) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(cards)
      }
    }
  )
})

// Update - PUT
// Destroy - DELETE

// ====================
// === Users Routes ===
// ====================

// Log In
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.redirect('/test')
})

// Log Out
router.get('/logout', function(req, res) {
  req.logout()
  return res.redirect('/')
})

// Create User - POST
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
      return res.redirect('/register')
    }
    passport.authenticate('local')(req, res, () => {
      console.log('Success: ')
      console.log(user.firstName + ' ' + user.lastName)
    })
  })
  return res.redirect('/login')
})

// Read - GET
// Returns a list of all users
router.get('/users', function(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(users)
    }
  })
})

// Search user by id
router.get('/user', function(req, res) {
  // console.log(req.query.userName)

  User.find({ username: req.query.userName }, (err, user) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(user)
      // console.log(user)
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
// === Tasks Routes ===
// ====================

// Create - POST
router.post('/tasks', function(req, res) {
  const newTask = new Task(req.body)
  newTask.save()
  res.status(201).send(newTask)
})

// Read - GET
router.get('/tasks', function(req, res) {
  Task.find({}, (err, tasks) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(200).send(tasks)
    }
  })
})

// Update - PUT

// Destroy - DELETE
router.delete('/tasks/:id', (req, res, next) => {
  res.send(req.params.id)
  Task.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
  })
})

module.exports = router
