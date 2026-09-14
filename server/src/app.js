const express = require('express')
const cors = require('cors')

//Routes
const authRoutes = require('./routes/authRoutes')
const workspaceRoutes = require('./routes/workspaceRoutes')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

app.use(express.json())
app.use(cors())


//routes middleware
app.use("/api/auth", authRoutes)
app.use("/api/workspaces", workspaceRoutes)
app.use("/api/workspaces/:workspaceId/tasks", taskRoutes)

module.exports = app