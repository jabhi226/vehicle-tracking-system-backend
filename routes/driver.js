const express = require('express')
const driverRouter = express.Router()

const driverController = require("../controller/driverController")

//login driver
driverRouter.get('/login/', async (req, res) => {
    return driverController.login(req, res)
})

//save driver
driverRouter.post('/', async (req, res) => {
    return driverController.save(req, res)
})

driverRouter.delete("/", async (req, res) => {
    return driverController.deleteDriver(req, res)
})

// //get api wiht dynamic parameters
// userRouter.get("/:userId", (req, res) => {
//     console.log(req.params)
//     var file = { user: 'Abhishek', id: `${req.params.userId}`, type: 'GET' }
//     res.json(file)
// })


module.exports = driverRouter