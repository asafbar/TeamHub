const authService = require('../services/authService')
const {toUserResponse} = require('../utils/userMapper')

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

module.exports = {
    register
}