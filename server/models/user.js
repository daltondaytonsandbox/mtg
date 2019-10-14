const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true
  },
  lastName: {
    type: String,
    lowercase: true
  },
  username: {
    type: String,
    lowercase: true
  },
  email: String,
  password: String
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
