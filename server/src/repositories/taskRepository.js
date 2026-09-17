const Task = require('../models/Task')

async function createTask(taskData) {
    return await Task.create(taskData)
}

async function getTaskById(id) {
    return await Task.findById(id)
}

async function updateTaskById(id, updateData) {
    return await Task.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    )
}

async function deleteTaskById(id) {
    return await Task.findByIdAndDelete(id)
}

async function getWorkspaceTasks(workspaceId) {
    return await Task.find({
        workspaceId
    })
}

async function reorderTasks(taskUpdates) {
    const operations = taskUpdates.map((taskUpdate) => ({
        updateOne: {
            filter: {
                _id: taskUpdate.taskId
            },
            update: {
                statusId: taskUpdate.statusId,
                position: taskUpdate.position
            }
        }
    }))

    return await Task.bulkWrite(operations)
}

module.exports = {
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    getWorkspaceTasks,
    reorderTasks
}