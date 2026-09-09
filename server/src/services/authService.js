const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepository')
const env = require('../config/env')

async function registerUser(userData) {
    const existUser = await userRepository.findUserByEmail(userData.email)

    if (existUser) {
        throw new Error("User already exists.")
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const newUser = await userRepository.createUser({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    })

    return newUser
}

async function loginUser(email, password) {
    const user = await userRepository.findUserByEmail(email)

    if (!user) {
        throw new Error("Invalid email or passwword.")
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    )

    if (!isPasswordValid) {
        throw new Error("Invalid email or passwword.")
    }

    const token = jwt.sign(
        { userId: user._id },
        env.jwtSecret,
        { expiresIn: "1h" }
    )

    return {
        token,
        user
    }
}

module.exports = {
    registerUser,
    loginUser
}