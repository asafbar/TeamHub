const taskService = require('../services/taskService')
const { toTaskResponse, toTaskListResponse } = require('../utils/taskMapper')
const { successResponse, errorResponse } = require('../utils/apiResponse')
const { toTaskStatusListResponse } = require('../utils/taskStatusMapper')
const { toTaskPriorityListResponse } = require('../utils/taskPriorityMapper')

async function createTask(req, res) {
    try {
        const task = await taskService.createTask(
            req.user.id,
            req.params.workspaceId,
            req.body
        )

        return res.status(201).json(
            successResponse(
                "Task created successfully.",
                toTaskResponse(task)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getWorkspaceTasks(req, res) {
    try {
        const tasks = await taskService.getWorkspaceTasks(
            req.user.id,
            req.params.workspaceId
        )

        return res.status(200).json(
            successResponse(
                "Tasks loaded successfully.",
                toTaskListResponse(tasks)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getTask(req, res) {
    try {
        const task = await taskService.getTask(
            req.user.id,
            req.params.workspaceId,
            req.params.taskId
        )

        return res.status(200).json(
            successResponse(
                "Task loaded successfully.",
                toTaskResponse(task)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function updateTask(req, res) {
    try {
        const task = await taskService.updateTask(
            req.user.id,
            req.params.workspaceId,
            req.params.taskId,
            req.body
        )

        return res.status(200).json(
            successResponse(
                "Task updated successfully.",
                toTaskResponse(task)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function deleteTask(req, res) {
    try {
        await taskService.deleteTask(
            req.user.id,
            req.params.workspaceId,
            req.params.taskId
        )

        return res.status(204).send()
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getWorkspaceStatuses(req, res) {
    try {
        const statuses = await taskService.getWorkspaceStatuses(
            req.user.id,
            req.params.workspaceId
        )

        return res.status(200).json(
            successResponse(
                "Task statuses loaded successfully.",
                toTaskStatusListResponse(statuses)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getWorkspacePriorities(req, res) {
    try {
        const priorities = await taskService.getWorkspacePriorities(
            req.user.id,
            req.params.workspaceId
        )

        return res.status(200).json(
            successResponse(
                "Task priorities loaded successfully.",
                toTaskPriorityListResponse(priorities)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function reorderTasks(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId } = req.params
        const { taskUpdates } = req.body

        const tasks = await taskService.reorderTasks(
            userId,
            workspaceId,
            taskUpdates
        )

        return res.status(200).json(
            successResponse(
                "Tasks reordered successfully.",
                toTaskListResponse(tasks)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

module.exports = {
    createTask,
    getWorkspaceTasks,
    getTask,
    updateTask,
    deleteTask,
    getWorkspaceStatuses,
    getWorkspacePriorities,
    reorderTasks
}