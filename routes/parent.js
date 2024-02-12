const express = require('express')
const parentRouter = express.Router()

const route = require("../controller/parentController")

parentRouter.get('/login/', async (req, res) => {
    return route.login(req, res)
})

parentRouter.post('/', async (req, res) => {
    return route.save(req, res)
})

parentRouter.delete("/", async (req, res) => {
    route.deleteParent(req, res)
})

module.exports = parentRouter