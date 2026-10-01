const jwt = require('jsonwebtoken')
const env = require('../config/env')

function socketAuthMiddleware(socket, next) {
    try {
        const token = socket.handshake.auth.token

        if(!token) {
            return next(new Error('Authentication required.'))
        }

        const decoded = jwt.verify(token, env.jwtSecret)

        socket.user = decoded

        next()

    } catch {
        next(new Error('Invalid or expired token.'))
    }
}

module.exports = socketAuthMiddleware