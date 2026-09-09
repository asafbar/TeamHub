const User = require('../models/User')

async function createUser(userData) {
    return await User.create(userData)
}

async function findUserByEmail(email) {
    return await User.findOne({ email })
}

async function findUserById(id) {
    return await User.findById(id)
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
}