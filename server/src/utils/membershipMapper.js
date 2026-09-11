function toMembershipResponse(membership) {
    return {
        id: membership._id,
        userId: membership.userId,
        workspaceId: membership.workspaceId,
        role: membership.role,
        joinedAt: membership.joinedAt
    }
}

module.exports = {
    toMembershipResponse
}