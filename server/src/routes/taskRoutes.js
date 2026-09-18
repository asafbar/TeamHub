const express = require('express')

const taskController = require('../controllers/taskController')
const requireAuth = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateMiddleware')
const taskStatusController = require('../controllers/taskStatusController')
const taskPriorityController = require('../controllers/taskPriorityController')
const {
    createTaskValidator,
    updateTaskValidator,
    reorderTasksValidator,
} = require('../validators/taskValidator')
const {
    createTaskStatusValidator,
    updateTaskStatusValidator,
    reorderTaskStatusesValidator
} = require('../validators/taskStatusValidator')
const {
    createTaskPriorityValidator,
    updateTaskPriorityValidator,
    reorderTaskPrioritiesValidator
} = require('../validators/taskPriorityValidator')

const router = express.Router({ mergeParams: true })

router.post(
    "/",
    requireAuth,
    createTaskValidator,
    validateRequest,
    taskController.createTask
)

router.get(
    "/",
    requireAuth,
    taskController.getWorkspaceTasks
)

router.get(
    "/statuses",
    requireAuth,
    taskController.getWorkspaceStatuses
)

router.post(
    "/statuses",
    requireAuth,
    createTaskStatusValidator,
    validateRequest,
    taskStatusController.createTaskStatus
)

router.patch(
    "/statuses/reorder",
    requireAuth,
    reorderTaskStatusesValidator,
    validateRequest,
    taskStatusController.reorderTaskStatuses
)

router.patch(
    "/statuses/:statusId",
    requireAuth,
    updateTaskStatusValidator,
    validateRequest,
    taskStatusController.updateTaskStatus
)

router.delete(
    "/statuses/:statusId",
    requireAuth,
    taskStatusController.deleteTaskStatus
)

router.get(
    "/priorities",
    requireAuth,
    taskController.getWorkspacePriorities
)

router.post(
    "/priorities",
    requireAuth,
    createTaskPriorityValidator,
    validateRequest,
    taskPriorityController.createTaskPriority
)

router.patch(
    "/priorities/reorder",
    requireAuth,
    reorderTaskPrioritiesValidator,
    validateRequest,
    taskPriorityController.reorderTaskPriorities
)

router.patch(
    "/priorities/:priorityId",
    requireAuth,
    updateTaskPriorityValidator,
    validateRequest,
    taskPriorityController.updateTaskPriority
)

router.delete(
    "/priorities/:priorityId",
    requireAuth,
    taskPriorityController.deleteTaskPriority
)

router.patch(
    "/reorder",
    requireAuth,
    reorderTasksValidator,
    validateRequest,
    taskController.reorderTasks
)

router.get(
    "/:taskId",
    requireAuth,
    taskController.getTask
)

router.patch(
    "/:taskId",
    requireAuth,
    updateTaskValidator,
    validateRequest,
    taskController.updateTask
)

router.delete(
    "/:taskId",
    requireAuth,
    taskController.deleteTask
)

module.exports = router