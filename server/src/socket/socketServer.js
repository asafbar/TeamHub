const socketAuthMiddleware = require('./socketAuthMiddleware')
const membershipRepository = require('../repositories/membershipRepository')

let ioInstance

function initializeSocket(io) {

    ioInstance = io

    io.use(socketAuthMiddleware)

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`)

        //join handler
        socket.on('workspace:join', async (workspaceId) => {
            try {
                const userId = socket.user.sub

                const membership = await membershipRepository.getMembershipByUserAndWorkspace(
                    userId,
                    workspaceId
                )

                if (!membership) {
                    console.log(`Socket ${socket.id} denied access to workspace ${workspaceId}`);
                    return
                }

                socket.join(`workspace:${workspaceId}`)

                console.log(`Socket ${socket.id} joined workspace ${workspaceId}`);
            } catch (error) {
                console.error('Socket workspace join error: ', error.message);
            }
        })

        //leave handler
        socket.on('workspace:leave', (workspaceId) => {
            socket.leave(`workspace:${workspaceId}`)

            console.log(`Socket ${socket.id} left workspace ${workspaceId}`);

        })

        socket.on('disconnect', () => {

            console.log(`Socket disconnected: ${socket.id}`)

        })
    })
}

function emitToWorkspace(workspaceId, event, data) {
    if (!workspaceId || !ioInstance) { return }

    ioInstance
        .to(`workspace:${workspaceId}`)
        .emit(event, data)
}

module.exports = {
    initializeSocket,
    emitToWorkspace
}