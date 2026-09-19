const { body } = require('express-validator')

const createTaskPriorityValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Task priority name is required."),

    body("color")
        .optional({nullable: true})
        .matches(/^#[0-9A-Fa-f]{6}$/)
        .withMessage("Color must be a valid hex color.")
]

const updateTaskPriorityValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Task name cannot be empty."),

        body("color")
        .optional({nullable: true})
        .matches(/^#[0-9A-Fa-f]{6}$/)
        .withMessage("Color must be a valid hex color.")
]

const reorderTaskPrioritiesValidator = [
    body("priorityUpdates")
        .isArray({ min: 1 })
        .withMessage("priorityUpdates must be a non-empty array."),

    body("priorityUpdates.*.priorityId")
        .notEmpty()
        .withMessage("priorityId is required."),

    body("priorityUpdates.*.position")
        .isInt({ min: 0 })
        .withMessage("position must be a non-negative integer.")
]

module.exports = {
    createTaskPriorityValidator,
    updateTaskPriorityValidator,
    reorderTaskPrioritiesValidator
}