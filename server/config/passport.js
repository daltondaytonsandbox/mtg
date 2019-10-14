const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username }, function(err, user) {
//       console.log('userfindone: ')
//       console.log(user)

//       if (err) {
//         console.log('error1')

//         return done(err)
//       }
//       if (!user) {
//         console.log('notusererror')

//         return done(null, false, { message: 'Incorrect username.' })
//       }
//       if (user.password !== password) {
//         console.log('password error')
//         console.log(user.password)

//         return done(null, false, { message: 'Incorrect password.' })
//       }
//       return done(null, user)
//     })
//   })
// )

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
