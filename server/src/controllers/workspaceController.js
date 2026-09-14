const workspaceService = require('../services/workspaceService')
const { successResponse, errorResponse } = require('../utils/apiResponse')
const { toMembershipResponse } = require('../utils/membershipMapper')
const { toWorkspaceMemberListResponse } = require('../utils/membershipMapper')

const {
    toWorkspaceResponse,
    toWorkspaceListResponse
} = require('../utils/workspaceMapper')

async function createWorkspace(req, res) {
    try {
        const workspace = await workspaceService.createWorkspace(
            req.user.id,
            req.body
        )

        return res.status(201).json(
            successResponse(
                "Workspace created successfully.",
                toWorkspaceResponse(workspace)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getUserWorkspaces(req, res) {
    try {
        const workspaces = await workspaceService.getUserWorkspaces(req.user.id)

        return res.status(200).json(
            successResponse(
                "Workspaces loaded successfully.",
                toWorkspaceListResponse(workspaces)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getWorkspaceById(req, res) {
    try {
        const workspace = await workspaceService.getWorkspaceById(
            req.user.id,
            req.params.id
        )

        return res.status(200).json(
            successResponse(
                "Workspace loaded successfully.",
                toWorkspaceResponse(workspace)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function addMember(req, res) {
    try {
        const membership = await workspaceService.addMemberToWorkspace(
            req.user.id,
            req.params.workspaceId,
            req.body.email,
            req.body.role
        )

        return res.status(201).json(
            successResponse(
                "Member added successfully.",
                toMembershipResponse(membership))
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

async function getWorkspaceMembers(req, res) {
    try {
        const members = await workspaceService.getWorkspaceMembers(
            req.user.id,
            req.params.workspaceId
        )

        return res.status(200).json(
            successResponse(
                "Workspace members loaded successfully.",
                toWorkspaceMemberListResponse(members)
            )
        )
    } catch (error) {
        return res.status(400).json(
            errorResponse(error.message)
        )
    }
}

module.exports = {
    createWorkspace,
    getUserWorkspaces,
    getWorkspaceById,
    addMember,
    getWorkspaceMembers
}