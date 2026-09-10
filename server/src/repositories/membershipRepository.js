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

module.exports = {
    createMembership,
    getMembershipByUserAndWorkspace,
    getMembershipsByUser
}