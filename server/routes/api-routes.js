const { Router } = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const Task = require('../models/task')
const Card = require('../models/card')
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

// ===================
// === Card Routes ===
// ===================

// Create - POST
// Read - GET
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
