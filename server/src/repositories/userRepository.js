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

async function updateUserById(id, updateData) {
    return await User.findByIdAndUpdate(
        id, 
        updateData,
        {
            new: true,
            runValidators: true
        }
    )
}

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById
}