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

async function createTaskPriority(taskPriorityData) {
    return await TaskPriority.create(taskPriorityData)
}

async function updateTaskPriorityById(id, updateData) {
    return await TaskPriority.findByIdAndUpdate(
        id,
        updateData,
        {
            returnDocument: "after",
            runValidators: true
        }
    )
}

async function deleteTaskPriorityById(id) {
    return await TaskPriority.findByIdAndDelete(id)
}

async function reorderTaskPriorities(priorityUpdates) {
    const operations = priorityUpdates.map((priority) => ({
        updateOne: {
            filter: { _id: priority.priorityId },
            update: {
                $set: {
                    position: priority.position
                }
            }
        }
    }))

    return await TaskPriority.bulkWrite(operations)
}

module.exports = {
    getTaskPriorityById,
    createDefaultTaskPriorities,
    getWorkspacePriorities,
    createTaskPriority,
    updateTaskPriorityById,
    deleteTaskPriorityById,
    reorderTaskPriorities
}