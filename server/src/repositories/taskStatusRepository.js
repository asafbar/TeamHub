const TaskStatus = require('../models/TaskStatus')

async function getTaskStatusById(id) {
    return await TaskStatus.findById(id)
}

async function createDefaultTaskStatuses(workspaceId, statuses) {
    const statusesWithWorkspace = statuses.map((status) => ({
        ...status,
        workspaceId
    }))

    return await TaskStatus.insertMany(statusesWithWorkspace)
}

async function getWorkspaceStatuses(workspaceId) {
    return await TaskStatus.find({
        workspaceId
    }).sort({
        position: 1
    })
}

module.exports = {
    getTaskStatusById,
    createDefaultTaskStatuses,
    getWorkspaceStatuses
}