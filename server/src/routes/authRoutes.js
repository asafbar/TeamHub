const express = require('express')
const authController = require('../controllers/authController')
const validateRequest = require('../middleware/validateMiddleware')
const { registerValidator, loginValidator } = require('../validators/authValidator')
const requireAuth = require('../middleware/authMiddleware')

const router = express.Router()

router.post(
    "/register", 
    registerValidator,
    validateRequest,
    authController.register)

router.post(
    "/login",
    loginValidator,
    validateRequest,
    authController.login
)

router.get(
    "/me",
    requireAuth,
    authController.me
)

module.exports = router