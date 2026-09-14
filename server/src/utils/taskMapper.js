function toTaskResponse(task) {
    return {
        id: task._id,
        workspaceId: task.workspaceId,
        title: task.title,
        description: task.description,
        statusId: task.statusId,
        priorityId: task.priorityId,
        assigneeMembershipId: task.assigneeMembershipId,
        createdByUserId: task.createdByUserId,
        dueDate: task.dueDate,
        position: task.position
    }
}

function toTaskListResponse(tasks) {
    return tasks.map(toTaskResponse)
}

module.exports = {
    toTaskResponse,
    toTaskListResponse
}