const { body } = require('express-validator')

const createTaskValidator = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required.")
    .isLength({max: 150})
    .withMessage("Task title must be at most 150 characters long."),

    body("description")
    .optional({nullable: true})
    .trim()
    .isLength({max: 1000})
    .withMessage("Task description must be at most 1000 characters long."),

    body("statusId")
    .notEmpty()
    .withMessage("Task status is required.")
    .isMongoId()
    .withMessage("Invalid task status."),
    
    body("priorityId")
    .notEmpty()
    .withMessage("Task priority is required.")
    .isMongoId()
    .withMessage("Invalid task priority."),

    body("assigneeMembershipId")
    .optional({nullable: true})
    .isMongoId()
    .withMessage("Invalid task assignee."),

    body("dueDate")
    .optional({nullable: true})
    .isISO8601()
    .withMessage("Invalid due date.")
]

const updateTaskValidator = [
    body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task title cannot be empty")
    .isLength({max: 150})
    .withMessage("Task title must be at most 150 characters long."),

    body("description")
    .optional({nullable: true})
    .trim()
    .isLength({max: 1000})
    .withMessage("Task description must be at most 1000 characters long."),

    body("statusId")
    .optional()
    .isMongoId()
    .withMessage("Invalid task status."),
    
    body("priorityId")
    .optional()
    .isMongoId()
    .withMessage("Invalid task priority."),

    body("assigneeMembershipId")
    .optional({nullable: true})
    .isMongoId()
    .withMessage("Invalid task assignee."),

    body("dueDate")
    .optional({nullable: true})
    .isISO8601()
    .withMessage("Invalid due date."),

    body("position")
    .optional()
    .isNumeric()
    .withMessage("Task position must be a number")
]

const reorderTasksValidator = [
    body("taskUpdates")
    .isArray({min:1})
    .withMessage("Task updates must be a non-empty array."),

    body("taskUpdates.*.taskId")
    .notEmpty()
    .withMessage("Task ID is required.")
    .isMongoId()
    .withMessage("Invalid task ID."),

    body("taskUpdates.*.statusId")
    .notEmpty()
    .withMessage("Task status is required.")
    .isMongoId()
    .withMessage("Invalid task status."),

    body("taskUpdates.*.position")
    .isInt({min: 0})
    .withMessage("Task position must be a non-negative integer.")
]

module.exports = {
    createTaskValidator,
    updateTaskValidator,
    reorderTasksValidator
}