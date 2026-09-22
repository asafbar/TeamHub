const authService = require('../services/authService')
const { toUserResponse } = require('../utils/userMapper')

const { successResponse, errorResponse } = require('../utils/apiResponse')

async function register(req, res) {
    try {
        const user = await authService.registerUser(req.body)

        res.status(201).json(
            successResponse("User registered successfuly.", toUserResponse(user))
        )
    } catch (error) {
        res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        const result = await authService.loginUser(email, password)

        res.status(200).json(
            successResponse("Login successful.",
                {
                    token: result.token,
                    user: toUserResponse(result.user)
                }
            )
        )

    } catch (error) {
        res.status(401).json(
            errorResponse(error.message)
        )
    }
}

async function me(req, res) {
    try {
        const user = await authService.getCurrentUser(req.user.id)

        return res.status(200).json(
            successResponse(
                "Current user loaded successfully.",
                toUserResponse(user)
            )
        )
    } catch (error) {
        return res.status(404).json(
            errorResponse(error.message)
        )
    }
}

async function updateMe(req, res) {
    try {
        const user = await authService.updateCurrentUser(
            req.user.id,
            req.body
        )

        return res.status(200).json(
            successResponse("User profile updated successfully.",
                toUserResponse(user))
        )
    } catch (error) {
        return res.status(404).json(
            errorResponse(error.message)
        )
    }
}

module.exports = {
    register,
    login,
    me,
    updateMe
}