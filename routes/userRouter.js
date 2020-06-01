const express = require('express')
const router = express.Router()
const json = require('body-parser').json()

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

//the one initialize we made
const initializePassport = require('../config/passport.config')
initializePassport(passport)

require('dotenv').config()

const userService = require('../service/userService')


router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))
router.use(session())
//automatic generated initialize
router.use(passport.initialize())

router.post('/register', json, (req, res) => {
    const user = req.body
    userService.add(user)
    .then((result) => {
        console.log(user.name + " registered")

        res.status(200)
        res.send(true)
    })
    .catch((err) => {
        res.status(500)
        res.send(err)
    })
})

//using a default middle ware function for login
router.post('/login', json, passport.authenticate('local'),(req, res) => {
    res.send('Authorized')
})

module.exports = router