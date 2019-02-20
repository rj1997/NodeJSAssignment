const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('./logging')

var server = express()
server.set('view engine', 'ejs')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

// server.use(morgan('dev', {
//   skip: function (req, res) {
//     return res.statusCode < 400
//   },
//   stream: process.stderr
// }))
//
// server.use(morgan('dev', {
//   skip: function (req, res) {
//     return res.statusCode >= 400
//   },
//   stream: process.stdout
// }))

const userroutes = require('./routes/userroutes')
server.use(userroutes)

server.listen(3000, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${3000}`)
})

module.exports = server
