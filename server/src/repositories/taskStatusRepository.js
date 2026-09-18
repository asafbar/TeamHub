const TaskStatus = require('../models/TaskStatus')

async function getTaskStatusById(id) {
    return await TaskStatus.findById(id)
}

async function createTaskStatus(taskStatusData) {
    return await TaskStatus.create(taskStatusData)
}

async function updateTaskStatusById(id, updateData) {
    return await TaskStatus.findByIdAndUpdate(
        id,
        updateData,
        {
            returnDocument: "after",
            runValidators: true
        }
    )
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

async function deleteTaskStatusById(id) {
    return await TaskStatus.findByIdAndDelete(id)
}

async function reorderTaskStatuses(statusUpdates) {
    const operations = statusUpdates.map((status) => ({
        updateOne: {
            filter: { _id: status.statusId},
            update: {
                $set: {
                    position: status.position
                }
            }
        }
    }))

    return await TaskStatus.bulkWrite(operations)
}

module.exports = {
    getTaskStatusById,
    createTaskStatus,
    updateTaskStatusById,
    createDefaultTaskStatuses,
    getWorkspaceStatuses,
    deleteTaskStatusById,
    reorderTaskStatuses
}