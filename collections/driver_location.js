const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: Number,
    busNumber: String,
    latitude: String,
    longitude: String,
    timestamp: String
})

module.exports = mongoose.model('Location', schema)