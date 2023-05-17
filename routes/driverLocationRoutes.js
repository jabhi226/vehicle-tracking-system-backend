const express = require('express')
const driverLocationRouter = express.Router()
const DriverLocation = require('../collections/driverLocation')

//route: http://localhost:3000/users/

//get driver location by bus number
driverLocationRouter.get('/by/busnumber/', async (req, res) => {
    try {
        const users = await DriverLocation.findOne({busNumber: req.query.busNumber})
        if (users == null) {
            res.json({status: "error", result: "Username or Password mismatch."})
        } else {
            res.json({status: "ok", result: users})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e.message})
    }
})

//upsert driver location by driver id
driverLocationRouter.post('/', async (req, res) => {
    try {
        const upserted = await DriverLocation.updateOne({id: req.body.id}, {
            id: req.body.id,
            busNumber: req.body.busNumber,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }, {upsert: true})
        return res.json(upserted)
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

// //get api wiht dynamic parameters
// userRouter.get("/:userId", (req, res) => {
//     console.log(req.params)
//     var file = { user: 'Abhishek', id: `${req.params.userId}`, type: 'GET' }
//     res.json(file)
// })


module.exports = driverLocationRouter