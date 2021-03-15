const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))


const validationMiddleware = require('./validationMiddleware')



app.use(validationMiddleware)

module.exports = app