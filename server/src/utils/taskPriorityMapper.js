const { toTaskStatusListResponse } = require("./taskStatusMapper")

function toTaskPriorityResponse(priority) {
    return {
        id: priority._id,
        workspaceId: priority.workspaceId,
        name: priority.name,
        position: priority.position
    }
}

function toTaskPriorityListResponse(priorities) {
    return priorities.map(toTaskPriorityResponse)
}

module.exports = {
    toTaskPriorityResponse,
    toTaskPriorityListResponse
}