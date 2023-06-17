const express = require('express')
const parentRouter = express.Router()
const Parent = require('../collections/parent')

parentRouter.get('/login/', async (req, res) => {
    try {
        const user = await Parent.findOne({username: req.query.username, password: req.query.password})
        if (user === null) {
            res.json({status: "error", result: "Username or Password mismatch."})
        } else {
            res.json({status: "ok", result: user})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e.message})
    }
})

parentRouter.post('/', async (req, res) => {
    const newParent = new Parent({
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        busNumber: req.body.busNumber,
    })
    try {
        const exitingParentByUsername = await Parent.find({username: req.body.username});
        if (exitingParentByUsername.length === 0) {
            const savedParent = await newParent.save()
            return res.json(savedParent)
        } else {
            return res.status(200).json({reuslt: 'Username already exist'})
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({error: e.message})
    }
})

parentRouter.delete("/", async (req, res) => {
    try {
        const deletedUser = await Parent.find({name: req.body.username});
        const op = deletedUser.remove().exec();
        console.log('op', op)
        res.json(deletedUser)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = parentRouter