const express = require('express')
const authController = require('../controllers/authController')
const validateRequest = require('../middleware/validateMiddleware')
const {
    registerValidator,
    loginValidator,
    updateMeValidator
} = require('../validators/authValidator')
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

router.patch(
    "/me",
    requireAuth,
    updateMeValidator,
    validateRequest,
    authController.updateMe
)

module.exports = router