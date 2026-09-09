const jwt = require('jsonwebtoken')
const env = require('../config/env')
const { errorResponse } = require('../utils/apiResponse')

function requireAuth(req, res, next) {
    const authHeader = req.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(
            errorResponse("Authentication required.")
        )
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, env.jwtSecret)

        req.user = {
            id: decoded.userId
        }

        next()
    } catch (error) {
        return res.status(401).json(
            errorResponse("Invalid or expired token.")
        )
    }
}

module.exports = requireAuth