const Membership = require('../models/Membership')

async function createMembership(membershipData) {
    return await Membership.create(membershipData)
}

async function getWorkspaceMemberById(id) {
    return await Membership.findById(id)
        .populate(
            "userId",
            "username email avatar"
        )
}

async function getMembershipByUserAndWorkspace(userId, workspaceId) {
    return await Membership.findOne({
        userId,
        workspaceId
    })
}

async function getMembershipsByUser(userId) {
    return await Membership.find({
        userId
    })
}

async function getMembershipById(id) {
    return await Membership.findById(id)
}

async function getWorkspaceMembers(workspaceId) {
    return await Membership.find({
        workspaceId
    })
    .populate(
        "userId",
        "username email avatar"
    )
    .sort({
        joinedAt: 1
    })
}

async function deleteWorkspaceMemberships(workspaceId) {
    return await Membership.deleteMany({
        workspaceId
    })
}

module.exports = {
    createMembership,
    getWorkspaceMemberById,
    getMembershipByUserAndWorkspace,
    getMembershipsByUser,
    getMembershipById,
    getWorkspaceMembers,
    deleteWorkspaceMemberships
}