const express = require('express')

const taskController = require('../controllers/taskController')
const requireAuth = require('../middleware/authMiddleware')
const validateRequest = require('../middleware/validateMiddleware')
const {createTaskValidator, updateTaskValidator} = require('../validators/taskValidator')

const router = express.Router({mergeParams: true})

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

router.get(
    "/priorities",
    requireAuth,
    taskController.getWorkspacePriorities
)

router.patch(
    "/reorder",
    requireAuth,
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