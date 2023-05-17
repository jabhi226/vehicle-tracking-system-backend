const express = require('express')
const driverRouter = express.Router()
const Driver = require('../collections/driver')

//login driver
driverRouter.get('/login/', async (req, res) => {
    try {
        const user = await Driver.findOne({username: req.query.username, password: req.query.password})
        if (user === null){
            res.json({ status: "error", result: "Username or Password mismatch." })
        } else {
            res.json({ status: "ok", result: user})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})

//save driver
driverRouter.post('/', async (req, res) => {
    const newDriver = new Driver({
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        busNumber: req.body.busNumber,
        test: req.body.test
    })
    try {
        const exitingUserByUsername = await Driver.find({username: req.body.username});
        if (exitingUserByUsername.length === 0){
            const savedUser = await newDriver.save()
            return res.json(savedUser)
        } else {
            return res.status(200).json({ reuslt: 'Username already exist' })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})

driverRouter.delete("/", async (req, res) => {
    try {
        const deletedUser = await Driver.find({name: req.body.username});
        const op = deletedUser.remove().exec();
        console.log('op', op)
        res.json(deletedUser)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

// //get api wiht dynamic parameters
// userRouter.get("/:userId", (req, res) => {
//     console.log(req.params)
//     var file = { user: 'Abhishek', id: `${req.params.userId}`, type: 'GET' }
//     res.json(file)
// })


module.exports = driverRouter