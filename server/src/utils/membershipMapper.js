function toMembershipResponse(membership) {
    return {
        id: membership._id,
        userId: membership.userId,
        workspaceId: membership.workspaceId,
        role: membership.role,
        joinedAt: membership.joinedAt
    }
}

function toWorkspaceMemberResponse(membership) {
    return {
        id: membership._id,
        user: {
            id: membership.userId._id,
            username: membership.userId.username,
            email: membership.userId.email,
            avatar: membership.userId.avatar
        },
        role: membership.role,
        joinedAt: membership.joinedAt
    }
}

function toWorkspaceMemberListResponse(memberships) {
    return memberships.map(toWorkspaceMemberResponse)
}

module.exports = {
    toMembershipResponse,
    toWorkspaceMemberResponse,
    toWorkspaceMemberListResponse
}