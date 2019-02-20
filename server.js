const express = require('express')
const bodyParser = require('body-parser')

var server = express()
server.set('view engine', 'ejs')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

const userroutes = require('./routes/userroutes')
server.use(userroutes)

server.listen(3000, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${3000}`)
})

module.exports = server
