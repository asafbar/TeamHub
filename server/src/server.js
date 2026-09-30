const env = require('./config/env')
const http = require('http')
const { Server } = require('socket.io')
const { initializeSocket } = require('./socket/socketServer')

const connectDB = require('./config/db')
const app = require("./app")

const PORT = env.port

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: env.clientUrl
    }
})

initializeSocket(io)

//Start server + db
connectDB()

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})