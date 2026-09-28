const mongoose = require('mongoose')

const workspaceScheme = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: null },
        color: { type: String, default: "#3b82f6" },
        icon: { type: String, default: "kanban" }
    },
    {
        timestamps: true
    }
)

const Workspace = mongoose.model("Workspace", workspaceScheme)

module.exports = Workspace