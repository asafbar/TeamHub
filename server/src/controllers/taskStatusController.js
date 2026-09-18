const taskStatusService = require('../services/taskStatusService')
const { successResponse, errorResponse } = require('../utils/apiResponse')

async function createTaskStatus(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId } = req.params
        const statusData = req.body

        const status = await taskStatusService.createTaskStatus(
            userId,
            workspaceId,
            statusData
        )

        return res.status(201).json(
            successResponse(
                "Task status created successfully.",
                status
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function updateTaskStatus(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId, statusId } = req.params
        const statusData = req.body

        const status = await taskStatusService.updateTaskStatus(
            userId,
            workspaceId,
            statusId,
            statusData
        )

        return res.status(200).json(
            successResponse(
                "Task status updated successfully."
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function deleteTaskStatus(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId, statusId } = req.params

        await taskStatusService.deleteTaskStatus(
            userId,
            workspaceId,
            statusId
        )

        return res.status(204).send()
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function reorderTaskStatuses(req, res) {
    try {
        const userId = req.user.id
        const { workspaceId } = req.params
        const { statusUpdates } = req.body

        await taskStatusService.reorderTaskStatuses(
            userId,
            workspaceId,
            statusUpdates
        )

        return res.status(200).json(
            successResponse("Task statuses reorderd successfully.")
        )

    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

module.exports = {
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus,
    reorderTaskStatuses
}