const mongoose = require('mongoose')

const Schema = mongoose.Schema

// User
const UsersSchema = new Schema({
  name: String,
  age: Number
})

const User = mongoose.model('user', UsersSchema)

// Card
const CardsSchema = new Schema({}, { strict: false })

const Card = mongoose.model('card', CardsSchema)

module.exports = {
  User,
  Card
}
