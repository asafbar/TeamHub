const { body } = require('express-validator')

const createWorkspaceValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Workspace name is required.")
        .isLength({ max: 100 })
        .withMessage("Workspace name must be at most 100 characters long."),

    body("description")
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 500 })
        .withMessage("Workspace description must be at most 500 characters long.")
]

const updateWorkspaceValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Workspace name cannot be empty.")
        .isLength({ max: 100 })
        .withMessage("Workspace name must be at most 100 characters long."),

    body("description")
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 500 })
        .withMessage("Workspace description must be at most 500 characters long."),

    body("color")
        .optional()
        .matches(/^#[0-9A-Fa-f]{6}$/)
        .withMessage("Workspace color must be a valid hex color."),

    body("icon")
        .optional()
        .isIn([
            "analytics",
            "business",
            "code",
            "development",
            "engineering",
            "integration",
            "kanban",
            "personal",
            "product",
            "research",
            "security",
            "tools"
        ])
        .withMessage("Invalid workspace icon.")
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
    addMemberValidator,
    updateWorkspaceValidator
}