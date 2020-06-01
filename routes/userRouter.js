const express = require('express')
const router = express.Router()
const json = require('body-parser').json()

const userService = require('../service/userService')

router.post('/register', json, (req, res) => {
    const user = req.body
    userService.add(user)
    .then((result) => {
        res.status(200)
        res.send(true)
    })
    .catch((err) => {
        res.status(500)
        res.send(err)
    })
})

module.exports = router