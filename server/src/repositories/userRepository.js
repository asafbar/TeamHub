const User = require('../models/User')

async function createUser(userData) {
    return await User.create(userData)
}

async function getUserByEmail(email) {
    return await User.findOne({ email })
}

async function getUserById(id) {
    return await User.findById(id)
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById
}