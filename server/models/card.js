const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
  card: String
})

module.exports = mongoose.model('Card', CardSchema)
