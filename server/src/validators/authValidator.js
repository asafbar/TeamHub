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

const loginValidator = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("A valide email is required."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
]

const updateMeValidator = [
    body("avatar")
    .optional()
    .matches(/^avatar-\d{3}\.svg$/)
    .withMessage("Invalid avatar."),

    body("theme")
    .optional()
    .isIn(["dark", "light"])
    .withMessage("Invalid theme")
]

module.exports = {
    registerValidator,
    loginValidator,
    updateMeValidator
}