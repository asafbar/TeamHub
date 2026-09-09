const { validationResult } = require('express-validator')
const { errorResponse } = require('../utils/apiResponse')

function validateRequest(req, res, next) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    return res.status(400).json(
        errorResponse(
            "Validation failed.",
            errors.array()
        )
    )
}

module.exports = validateRequest