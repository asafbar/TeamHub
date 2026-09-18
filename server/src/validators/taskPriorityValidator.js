const { body } = require('express-validator')

const createTaskPriorityValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Task name is required.")
]

const updateTaskPriorityValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Task name cannot be empty.")
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