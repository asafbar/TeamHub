const taskPriorityService = require('../services/taskPriorityService')
const { successResponse, errorResponse } = require('../utils/apiResponse')

async function createTaskPriority(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId } = req.params
        const priorityData = req.body

        const priority = await taskPriorityService.createTaskPriority(
            userId,
            workspaceId,
            priorityData
        )

        return res.status(201).json(
            successResponse("Task priority created successfully.",
                priority
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function updateTaskPriority(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId, priorityId } = req.params
        const priorityData = req.body

        const priority = await taskPriorityService.updateTaskPriority(
            userId,
            workspaceId,
            priorityId,
            priorityData
        )

        return res.status(200).json(
            successResponse(
                "Task priority updated successfully.",
                priority
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function deleteTaskPriority(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId, priorityId } = req.params

        await taskPriorityService.deleteTaskPriority(
            userId,
            workspaceId,
            priorityId
        )

        return res.status(204).send()
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function reorderTaskPriorities(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId } = req.params
        const { priorityUpdates } = req.body

        await taskPriorityService.reorderTaskPriorities(
            userId,
            workspaceId,
            priorityUpdates
        )

        return res.status(200).json(
            successResponse(
                "Task priorities reordered successfully."
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

module.exports = {
    createTaskPriority,
    updateTaskPriority,
    deleteTaskPriority,
    reorderTaskPriorities
}