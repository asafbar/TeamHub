const taskPriorityRepository = require('../repositories/taskPriorityRepository')
const membershipRepository = require("../repositories/membershipRepository")
const taskRepository = require('../repositories/taskRepository')

async function createTaskPriority(
    userId,
    workspaceId,
    priorityData
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const priorities = await taskPriorityRepository.getWorkspacePriorities(
        workspaceId
    )

    return await taskPriorityRepository.createTaskPriority({
        workspaceId,
        name: priorityData.name,
        color: priorityData.color,
        position: priorities.length
    })
}

async function updateTaskPriority(
    userId,
    workspaceId,
    priorityId,
    priorityData
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const priority = await taskPriorityRepository.getTaskPriorityById(priorityId)

    if (!priority || priority.workspaceId.toString() !== workspaceId) {
        throw new Error("Task priority not found.")
    }

    const updateData = {
        name: priorityData.name,
        color: priorityData.color
    }

    Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
            delete updateData[key]
        }
    })

    return await taskPriorityRepository.updateTaskPriorityById(
        priorityId,
        updateData
    )
}

async function deleteTaskPriority(
    userId,
    workspaceId,
    priorityId
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const priority = await taskPriorityRepository.getTaskPriorityById(priorityId)

    if (!priority || priority.workspaceId.toString() !== workspaceId) {
        throw new Error("Task priority not found.")
    }

    const priorities = await taskPriorityRepository.getWorkspacePriorities(
        workspaceId
    )

    if (priorities.length <= 1) {
        throw new Error("The last task priority cannot be deleted.")
    }

    const tasks = await taskRepository.getWorkspaceTasks(workspaceId)

    const priorityHasTasks = tasks.some(
        (task) => task.priorityId.toString() === priorityId
    )

    if (priorityHasTasks) {
        throw new Error("Cannot delete a task priority that is used by tasks.")
    }

    return await taskPriorityRepository.deleteTaskPriorityById(priorityId)
}

async function reorderTaskPriorities(
    userId,
    workspaceId,
    priorityUpdates
) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const workspacePriorities = await taskPriorityRepository.getWorkspacePriorities(
        workspaceId
    )

    const workspacePriorityIds = new Set(
        workspacePriorities.map(
            (priority) => priority._id.toString()
        )
    )

    const allPrioritiesBelongToWorkspace = priorityUpdates.every((priority) => workspacePriorityIds.has(priority.priorityId))

    if (!allPrioritiesBelongToWorkspace) {
        throw new Error("One or more task priorities do not belong to this workspace.")
    }

    return await taskPriorityRepository.reorderTaskPriorities(priorityUpdates)
}

module.exports = {
    createTaskPriority,
    updateTaskPriority,
    deleteTaskPriority,
    reorderTaskPriorities
}