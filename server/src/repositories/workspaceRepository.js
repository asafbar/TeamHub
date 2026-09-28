const Workspace = require('../models/Workspace')

async function createWorkspace(workspaceData) {
    return await Workspace.create(workspaceData)
}

async function getWorkspaceById(id) {
    return await Workspace.findById(id)
}

async function updateWorkspace(id, workspaceData) {
    return await Workspace.findByIdAndUpdate(
        id,
        workspaceData,
        {
            new: true,
            runValidators: true
        }
    )
}

async function getMultipleWorkspacesByIds(ids) {
    return await Workspace.find({
        _id: { $in: ids }
    })
}

module.exports = {
    createWorkspace,
    getWorkspaceById,
    updateWorkspace,
    getMultipleWorkspacesByIds
}