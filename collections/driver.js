const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    username: String,
    password: String,
    busNumber: String,
    test: String
})

module.exports = mongoose.model('Driver', schema)