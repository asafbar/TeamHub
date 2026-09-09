const express = require('express')
const authController = require('../controllers/authController')
const validateRequest = require('../middleware/validateMiddleware')
const { registerValidator } = require('../validators/authValidator')

const router = express.Router()

router.post("/register", 
    registerValidator,
    validateRequest,
    authController.register)


module.exports = router