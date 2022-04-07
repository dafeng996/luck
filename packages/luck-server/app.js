const path = require('path')
const logger = require('morgan')
const express = require('express')
const createError = require('http-errors')
const httpContext = require('express-http-context')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', (req, res) => {
  res.send({
  })
})

module.exports = app
