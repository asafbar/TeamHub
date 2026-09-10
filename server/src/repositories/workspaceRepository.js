const Workspace = require('../models/Workspace')

async function createWorkspace(workspaceData) {
    return await Workspace.create(workspaceData)
}

async function getWorkspaceById(id) {
    return await Workspace.findById(id)
}

async function getMultipleWorkspacesByIds(ids) {
    return await Workspace.find({
        _id: { $in: ids }
    })
}

module.exports = {
    createWorkspace,
    getWorkspaceById,
    getMultipleWorkspacesByIds
}