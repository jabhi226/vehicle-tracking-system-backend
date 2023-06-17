const express = require('express')
const driverLocationRouter = express.Router()
const DriverLocation = require('../collections/driver_location')


//get driver location by bus number
driverLocationRouter.get('/by/busnumber/', async (req, res) => {
    try {
        const latLong = await DriverLocation.findOne({busNumber: req.query.busNumber})
        if (latLong == null) {
            res.json({status: "error", result: "Username or Password mismatch."})
        } else {
            res.json({status: "ok", result: latLong})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e.message})
    }
})

//upsert driver location by driver id
driverLocationRouter.post('/', async (req, res) => {
    try {
        const upserted = await DriverLocation.updateOne({busNumber: req.body.busNumber}, {
            busNumber: req.body.busNumber,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            timestamp: req.body.timestamp
        }, {upsert: true})
        if (upserted == null) {
            res.json({status: "error", result: "error."})
        } else {
            res.json({status: "ok", result: upserted})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e.message})
    }
})

driverLocationRouter.delete("/", async (req, res) => {
    try {
        const deletedUser = await DriverLocation.find({name: req.body.username});
        const op = deletedUser.remove().exec();
        console.log('op', op)
        res.json(deletedUser)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = driverLocationRouter