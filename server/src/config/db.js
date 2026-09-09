const mongoose = require('mongoose')
const env = require('./env')

async function connectDB() {
    try {
       await mongoose.connect(env.mongoUri)
       console.log("MongoDB connected successfully.")
    } catch (error) {
        console.log("Connection failed: ", error.message)
    }
}

module.exports = connectDB

