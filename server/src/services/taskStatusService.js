const membershipRepository = require("../repositories/membershipRepository")
const taskStatusRepository = require('../repositories/taskStatusRepository')
const taskRepository = require('../repositories/taskRepository')

async function createTaskStatus(userId, workspaceId, statusData) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const statuses = await taskStatusRepository.getWorkspaceStatuses(workspaceId)

    return await taskStatusRepository.createTaskStatus({
        workspaceId,
        name: statusData.name,
        position: statuses.length,
        isCompleted: statusData.isCompleted || false
    })
}

async function updateTaskStatus(
    userId,
    workspaceId,
    statusId,
    statusData
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const status = await taskStatusRepository.getTaskStatusById(statusId)

    if(!status || status.workspaceId.toString() !== workspaceId) {
        throw new Error("Task status not found")
    }

    const updateData = {
        name: statusData.name,
        isCompleted: statusData.isCompleted
    }

    Object.keys(updateData).forEach((key)=> {
        if(updateData[key]===undefined) {
            delete updateData[key]
        }
    })

    return await taskStatusRepository.updateTaskStatusById(
        statusId,
        updateData
    )
}

async function deleteTaskStatus(
    userId,
    workspaceId,
    statusId
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

     const status = await taskStatusRepository.getTaskStatusById(statusId)

    if(!status || status.workspaceId.toString() !== workspaceId) {
        throw new Error("Task status not found")
    }

    const statuses = await taskStatusRepository.getWorkspaceStatuses(workspaceId)

    if(statuses.length <= 1) {
        throw new Error("The last status cannot be deleted.")
    }

    tasks = await taskRepository.getWorkspaceTasks(workspaceId)

    const statusHasTasks = tasks.some(
        (task) => task.statusId.toString() === statusId
    )

    if(statusHasTasks) {
        throw new Error("Cannot delete a task status that contains tasks.")
    }

    return await taskStatusRepository.deleteTaskStatusById(statusId)
}

async function reorderTaskStatuses(
    userId,
    workspaceId,
    statusUpdates
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const workspaceStatuses = await taskStatusRepository.getWorkspaceStatuses(workspaceId)

    const workspaceStatusIds = new Set(
        workspaceStatuses.map((status)=> status._id.toString())
    )

    const allStatusesBelongToWorkspace = statusUpdates.every((status) =>
    workspaceStatusIds.has(status.statusId))

    if(!allStatusesBelongToWorkspace) {
        throw new Error(
            "One or more task statuses do not belong to this workspace.")
    }

    await taskStatusRepository.reorderTaskStatuses(statusUpdates)

    return await taskStatusRepository.getWorkspaceStatuses(workspaceId)
}

module.exports = {
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus,
    reorderTaskStatuses
}