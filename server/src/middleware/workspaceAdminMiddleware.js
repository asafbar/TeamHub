const membershipRepository = require('../repositories/membershipRepository')
const { errorResponse } = require('../utils/apiResponse')

async function requireWorkspaceAdmin(req, res, next) {
    const workspaceId = req.params.workspaceId
    const userId = req.user.id

    const membership = await membershipRepository.getMembershipByUserAndWorkspace(
        userId,
        workspaceId
    )

    // TODO: Replace hardcoded management roles with workspace role permissions.
    if(!membership || !["owner", "admin"].includes(membership.role)) {
        return res.status(403).json(
            errorResponse("You do not have permission to manage workspace members.")
        )
    }

    req.membership = membership
    next()
}

module.exports = requireWorkspaceAdmin