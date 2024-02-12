const express = require('express')//retrofit in nodejs
const app = express()
const mongoose = require('mongoose')//db

//this is used to get req.body preperly
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    res.status(500).json({ error: 'Send proper request' })
})

mongoose.connect('mongodb://0.0.0.0:27017/vehicletracking')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected To DB"))

const driverRoutes = require('./routes/driver')
app.use('/driver', driverRoutes)

const driverLocationRoutes = require('./routes/driverLocation')
app.use('/driverLocation', driverLocationRoutes)

const parentRoutes = require('./routes/parent')
app.use('/parent', parentRoutes)

app.listen(3001, () => console.log("Server Started."))