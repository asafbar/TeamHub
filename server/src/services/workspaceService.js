const workspaceRepository = require('../repositories/workspaceRepository')
const membershipRepository = require('../repositories/membershipRepository')
const userRepository = require('../repositories/userRepository')
const taskStatusRepository = require('../repositories/taskStatusRepository')
const taskPriorityRepository = require('../repositories/taskPriorityRepository')
const taskRepository = require('../repositories/taskRepository')

const {
    DEFAULT_TASK_STATUSES,
    DEFAULT_TASK_PRIORITIES
} = require('../constants/taskDefaults')

async function createWorkspace(userId, workspaceData) {
    const workspace = await workspaceRepository.createWorkspace(
        workspaceData
    )

    // TODO: Use a MongoDB transaction so workspace, owner membership,
    // default statuses and priorities are created atomically.
    await membershipRepository.createMembership({
        userId,
        workspaceId: workspace._id,
        role: "owner"
    })

    await taskStatusRepository.createDefaultTaskStatuses(
        workspace._id,
        DEFAULT_TASK_STATUSES
    )

    await taskPriorityRepository.createDefaultTaskPriorities(
        workspace._id,
        DEFAULT_TASK_PRIORITIES
    )

    return workspace
}

async function getUserWorkspaces(userId) {
    const memberships = await membershipRepository.getMembershipsByUser(userId)

    const workspaceIds = memberships.map((membership) => membership.workspaceId)

    return await workspaceRepository.getMultipleWorkspacesByIds(workspaceIds)
}

async function getWorkspaceById(userId, workspaceId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    const workspace = await workspaceRepository.getWorkspaceById(workspaceId)

    if (!workspace) {
        throw new Error("Workspace not found.")
    }

    return workspace
}

async function updateWorkspace(userId, workspaceId, workspaceData) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    if (membership.role !== "owner") {
        throw new Error("Only the workspace owner can update the workspace.")
    }

    const allowedFields = [
        "name",
        "description",
        "color",
        "icon"
    ]

    const allowUpdates = {}

    allowedFields.forEach((field) => {
        if (workspaceData[field] !== undefined) {
            allowUpdates[field] = workspaceData[field]
        }
    })

    const workspace = await workspaceRepository.updateWorkspace(
        workspaceId,
        allowUpdates
    )

    if (!workspace) {
        throw new Error("Workspace not found.")
    }

    return workspace
}

async function deleteWorkspace(userId, workspaceId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    if (membership.role !== "owner") {
        throw new Error("Only the workspace owner can delete the workspace.")
    }

    const workspace = await workspaceRepository.getWorkspaceById(workspaceId)

    if (!workspace) {
        throw new Error("Workspace not found.")
    }

    await taskRepository.deleteWorkspaceTasks(workspaceId)
    await taskStatusRepository.deleteWorkspaceTaskStatuses(workspaceId)
    await taskPriorityRepository.deleteWorkspaceTaskPriorities(workspaceId)
    await membershipRepository.deleteWorkspaceMemberships(workspaceId)

    return await workspaceRepository.deleteWorkspaceById(workspaceId)
}

async function addMemberToWorkspace(
    requestingUserId,
    workspaceId,
    email,
    role
) {
    const user = await userRepository.getUserByEmail(email)

    if (!user) {
        throw new Error("User not found.")
    }

    const existingMembership = await membershipRepository.getMembershipByUserAndWorkspace(
        user._id,
        workspaceId
    )

    if (existingMembership) {
        throw new Error("User is already a member of this workspace.")
    }

    const membership = await membershipRepository.createMembership({
        userId: user._id,
        workspaceId,
        role
    })

    return await membershipRepository.getWorkspaceMemberById(
        membership._id
    )
}

async function getWorkspaceMembers(userId, workspaceId) {
    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    if (!membership) {
        throw new Error("Workspace not found.")
    }

    return await membershipRepository.getWorkspaceMembers(workspaceId)
}

module.exports = {
    createWorkspace,
    getUserWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace,
    addMemberToWorkspace,
    getWorkspaceMembers
}