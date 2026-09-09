const bcrypt = require('bcrypt')
const userRepository = require('../repositories/userRepository')

async function registerUser(userData) {
    const existUser = await userRepository.findUserByEmail(userData.email)

    if (existUser) {
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const newUser = await userRepository.createUser({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    })

    return newUser
}

module.exports = {
    registerUser
}