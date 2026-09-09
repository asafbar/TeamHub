const express = require('express')
const cors = require('cors')

//Routes
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use(cors())


//routes middleware
app.use("/api/auth", authRoutes)

module.exports = app