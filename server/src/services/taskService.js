const taskRepository = require('../repositories/taskRepository')
const membershipRepository = require('../repositories/membershipRepository')
const taskStatusRepository = require('../repositories/taskStatusRepository')
const taskPriorityRepository = require('../repositories/taskPriorityRepository')

async function createTask(userId, workspaceId, taskData) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const status = await taskStatusRepository.getTaskStatusById(taskData.statusId)

    if (!status || status.workspaceId.toString() !== workspaceId) {
        throw new Error("Invalid task status.")
    }

    const priority = await taskPriorityRepository.getTaskPriorityById(taskData.priorityId)

    if (!priority || priority.workspaceId.toString() !== workspaceId) {
        throw new Error("Invalid task priority.")
    }

    if (taskData.assigneeMembershipId) {
        const assignee = await membershipRepository.getMembershipById(taskData.assigneeMembershipId)

        if (!assignee || assignee.workspaceId.toString() !== workspaceId) {
            throw new Error("Invalid task assignee.")
        }
    }

    return await taskRepository.createTask({
        workspaceId,
        title: taskData.title,
        description: taskData.description,
        statusId: taskData.statusId,
        priorityId: taskData.priorityId,
        assigneeMembershipId: taskData.assigneeMembershipId || null,
        createdByUserId: userId,
        dueDate: taskData.dueDate || null,
        position: taskData.position
    })
}

async function getWorkspaceTasks(userId, workspaceId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    return await taskRepository.getWorkspaceTasks(workspaceId)
}

async function getTask(userId, workspaceId, taskId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const task = await taskRepository.getTaskById(taskId)

    if (!task || task.workspaceId.toString() !== workspaceId) {
        throw new Error("Task not found.")
    }

    return task
}

async function updateTask(userId, workspaceId, taskId, taskData) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const task = await taskRepository.getTaskById(taskId)

    if (!task || task.workspaceId.toString() !== workspaceId) {
        throw new Error("Task not found.")
    }

    if (taskData.statusId) {
        const status = await taskStatusRepository.getTaskStatusById(taskData.statusId)

        if (!status || status.workspaceId.toString() !== workspaceId) {
            throw new Error("Invalid task status.")
        }
    }

    if (taskData.priorityId) {
        const priority = await taskPriorityRepository.getTaskPriorityById(taskData.priorityId)

        if (!priority || priority.workspaceId.toString() !== workspaceId) {
            throw new Error("Invalid task priority.")
        }
    }

    if (taskData.assigneeMembershipId) {
        const assignee = await membershipRepository.getMembershipById(taskData.assigneeMembershipId)

        if (!assignee || assignee.workspaceId.toString() !== workspaceId) {
            throw new Error("Invalid task assignee.")
        }
    }

    const updateData = {
        title: taskData.title,
        description: taskData.description,
        statusId: taskData.statusId,
        priorityId: taskData.priorityId,
        assigneeMembershipId: taskData.assigneeMembershipId,
        dueDate: taskData.dueDate,
        position: taskData.position
    }

    Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
            delete updateData[key]
        }
    })

    return await taskRepository.updateTaskById(
        taskId,
        updateData
    )
}

async function deleteTask(userId, workspaceId, taskId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const task = await taskRepository.getTaskById(taskId)

    if (!task || task.workspaceId.toString() !== workspaceId) {
        throw new Error("Task not found.")
    }

    const canDelete =
        membership.role == "owner" ||
        membership.role == "admin" ||
        task.createdByUserId.toString() === userId

    if (!canDelete) {
        throw new Error("You do not have permission to delete this task.")
    }

    return await taskRepository.deleteTaskById(taskId)
}

async function getWorkspaceStatuses(userId, workspaceId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    return await taskStatusRepository.getWorkspaceStatuses(workspaceId)
}

async function getWorkspacePriorities(userId, workspaceId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    return await taskPriorityRepository.getWorkspacePriorities(workspaceId)
}

async function reorderTasks(userId, workspaceId, taskUpdates) {
    // User must belong to the workspace.
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const workspaceTasks = await taskRepository.getWorkspaceTasks(workspaceId)
    const workspaceStatuses = await taskStatusRepository.getWorkspaceStatuses(workspaceId)

    const workspaceTaskIds = workspaceTasks.map((task) => task._id.toString())

    const workspaceStatusIds = workspaceStatuses.map((status) => status._id.toString())

    // Every task must belong to this workspace.
    const hasInvalidTask = taskUpdates.some(
        (taskUpdate) => !workspaceTaskIds.includes(taskUpdate.taskId)
    )

    if (hasInvalidTask) {
        throw new Error("Invalid task order.")
    }

    // Every destination status must belong to this workspace.
    const hasInvalidStatus = taskUpdates.some(
        (taskUpdate) => !workspaceStatusIds.includes(taskUpdate.statusId)
    )

    if (hasInvalidStatus) {
        throw new Error("Invalid task status.")
    }

    await taskRepository.reorderTasks(taskUpdates)

    return await taskRepository.getWorkspaceTasks(workspaceId)
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