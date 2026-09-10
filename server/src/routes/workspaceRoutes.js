const express = require('express')
const workspaceController = require('../controllers/workspaceController')
const requireAuth = require('../middleware/authMiddleware')
const { createWorkspaceValidator, addMemberValidator } = require('../validators/workspaceValidator')
const validateRequest = require('../middleware/validateMiddleware')
const requireWorkspaceAdmin = require('../middleware/workspaceAdminMiddleware')

const router = express.Router()

router.post(
    '/',
    requireAuth,
    createWorkspaceValidator,
    validateRequest,
    workspaceController.createWorkspace
)

router.get(
    '/',
    requireAuth,
    workspaceController.getUserWorkspaces
)

router.get(
    '/:id',
    requireAuth,
    workspaceController.getWorkspaceById
)

router.post(
    "/:workspaceId/members",
    requireAuth,
    requireWorkspaceAdmin,
    addMemberValidator,
    validateRequest,
    workspaceController.addMember
)

module.exports = router