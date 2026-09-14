const Membership = require('../models/Membership')

async function createMembership(membershipData) {
    return await Membership.create(membershipData)
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

module.exports = {
    createMembership,
    getMembershipByUserAndWorkspace,
    getMembershipsByUser,
    getMembershipById,
    getWorkspaceMembers
}