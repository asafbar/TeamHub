const TaskPriority = require('../models/TaskPriority')

async function getTaskPriorityById(id) {
    return await TaskPriority.findById(id)
}

async function createDefaultTaskPriorities(workspaceId, priorities) {
    const prioritiesWithWorkspace = priorities.map((priority) => ({
        ...priority,
        workspaceId
    }))

    return await TaskPriority.insertMany(prioritiesWithWorkspace)
}

async function getWorkspacePriorities(workspaceId) {
    return await TaskPriority.find({
        workspaceId
    }).sort({
        position: 1
    })
}

module.exports = {
    getTaskPriorityById,
    createDefaultTaskPriorities,
    getWorkspacePriorities
}