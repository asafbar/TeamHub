const authService = require('../services/authService')
const { toUserResponse } = require('../utils/userMapper')


const { successResponse, errorResponse } = require('../utils/apiResponse')

async function register(req, res) {
    try {
        const user = await authService.registerUser(req.body)

        res.status(201).json(
            successResponse("User registered successffuly.", toUserResponse(user))
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
            successResponse("Login successful", 
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


module.exports = {
    register,
    login
}