const {body} = require('express-validator')

const createWorkspaceValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Workspace name is required.")
    .isLength({max: 100})
    .withMessage("Workspace name must be at most 100 characters long."),

    body("description")
    .optional({nullable: true})
    .trim()
    .isLength({max: 500})
    .withMessage("Workspace description must be at most 500 characters long.")
]

const addMemberValidator = [
    body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required."),

    body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
]

module.exports = {
    createWorkspaceValidator,
    addMemberValidator
}