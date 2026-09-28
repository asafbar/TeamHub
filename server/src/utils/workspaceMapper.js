function toWorkspaceResponse(workspace) {
    return {
        id: workspace._id,
        name: workspace.name,
        description: workspace.description,
        color: workspace.color,
        icon: workspace.icon,
        updatedAt: workspace.updateedAt
    }
}

function toWorkspaceListResponse(workspaces) {
    return workspaces.map(toWorkspaceResponse)
}

module.exports = {
    toWorkspaceResponse,
    toWorkspaceListResponse
}