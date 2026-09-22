const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/userRepository')
const env = require('../config/env')

async function registerUser(userData) {
    const existUser = await userRepository.getUserByEmail(userData.email)

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
    const user = await userRepository.getUserByEmail(email)

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
        { sub: user._id },
        env.jwtSecret,
        { expiresIn: env.jwtExpiresIn }
    )

    return {
        token,
        user
    }
}

async function getCurrentUser(userId) {
    const user = await userRepository.getUserById(userId)

    if (!user) {
        throw new Error("User not found.")
    }

    return user
}

async function updateCurrentUser(userId, userData) {
    const user = await userRepository.updateUserById(
        userId,
        {
            avatar: userData.avatar
        }
    )

    if (!user) {
        throw new Error("User not found.")
    }
    
    return user
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    updateCurrentUser
}