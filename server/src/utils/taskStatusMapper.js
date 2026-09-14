function toTaskStatusResponse(status) {
    return {
        id: status._id,
        workspaceId: status.workspaceId,
        name: status.name,
        position: status.position,
        isCompleted: status.isCompleted
    }
}

function toTaskStatusListResponse(statuses) {
    return statuses.map(toTaskStatusResponse)
}

module.exports = {
    toTaskStatusResponse,
    toTaskStatusListResponse
}