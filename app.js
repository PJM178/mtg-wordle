const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const cardRouter = require('./controllers/setImages')
const cardDataRouter = require('./controllers/cardData')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/sets', cardRouter)
app.use('/api/cards', cardDataRouter)

module.exports = app