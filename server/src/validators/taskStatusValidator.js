const { body } = require('express-validator')

const createTaskStatusValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Task status name is required."),

    body("isCompleted")
        .optional()
        .isBoolean()
        .withMessage("isCompleted must be a boolean.")
]

const updateTaskStatusValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Task status name cannot be empty."),

    body("isCompleted")
        .optional()
        .isBoolean()
        .withMessage("isCompleted must be a boolean.")
]

const reorderTaskStatusesValidator = [
    body("statusUpdates")
        .isArray({ min: 1 })
        .withMessage("statusUpdates must be a non-empty array."),

    body("statusUpdates.*.statusId")
        .notEmpty()
        .withMessage("statusId is required."),

    body("statusUpdates.*.position")
        .isInt({ min: 0 })
        .withMessage("position must be a non-negative integer.")
]

module.exports = {
    createTaskStatusValidator,
    updateTaskStatusValidator,
    reorderTaskStatusesValidator
}