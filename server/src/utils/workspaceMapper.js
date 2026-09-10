function toWorkspaceResponse(workspace) {
    return {
        id: workspace._id,
        name: workspace.name,
        description: workspace.description,
        updateedAt: workspace.updateedAt
    }
}

function toWorkspaceListResponse(workspaces) {
    return workspaces.map(toWorkspaceResponse)
}

module.exports = {
    toWorkspaceResponse,
    toWorkspaceListResponse
}