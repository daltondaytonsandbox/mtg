/* eslint-disable no-console */
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const mongoose = require('mongoose')

// Mongoose Set Up
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // Connected
  // const kittySchema = new mongoose.Schema({
  //   name: String
  // })
  // const Kitten = mongoose.model('Kitten', kittySchema)
  // const silence = new Kitten({ name: 'Silence' })
  // const fluffy = new Kitten({ name: 'fluffy' })
  // fluffy.save(function(err, fluffy) {
  //   if (err) return console.error(err)
  // })
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
