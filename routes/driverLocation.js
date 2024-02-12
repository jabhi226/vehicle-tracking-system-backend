const express = require('express')
const driverLocationRouter = express.Router()
const DriverLocation = require('../collections/driverLocation')

const route = require("../controller/driverLocationController")

//get driver location by bus number
driverLocationRouter.get('/by/busnumber/', async (req, res) => {
    return route.getByBusNumber(req, res)
})

//upsert driver location by driver id
driverLocationRouter.post('/', async (req, res) => {
    return route.upsertLocation(req, res)
})

driverLocationRouter.delete("/", async (req, res) => {
    return route.deleteLocation(req, res)
})

module.exports = driverLocationRouter