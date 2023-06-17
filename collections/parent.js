const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    username: String,
    password: String,
    busNumber: String
})

module.exports = mongoose.model('Parent', schema)