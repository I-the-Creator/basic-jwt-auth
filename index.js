const express = require('express')
const mongoose = require('mongoose')

//import Router
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000



const app = express()

//to allow express server to parse json which we get from DB
app.use(express.json())

// to listen Router on '/auth' URL
app.use('/auth', authRouter)

const  start = async () => {
    try {
        await mongoose.connect('mongodb+srv://qwerty:qwerty123@cluster0.wq1sq.mongodb.net/auth_roles?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server is running and listening on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()