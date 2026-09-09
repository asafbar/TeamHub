const { body } = require('express-validator')

const registerValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("A valide email is required."),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must by at least 6 characters long.")
]

module.exports = {
    registerValidator
}