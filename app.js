const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/userRouter')
app.use(userRouter)

mongoose.connect('mongodb://localhost/userAuth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    console.log('Mongoose connected to server')
})
.catch((err) => {
    console.log('Error in connecting to server')
})

const server = app.listen(8080, () => {
    console.log('Server started at port : ' + server.address().port)
})