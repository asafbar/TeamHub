const mongoose = require('mongoose')

const taskStatusScheme = new mongoose.Schema(
    {
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },

        name: { type: String, required: true, trim: true },
        position: { type: Number, required: true },
        isCompleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

taskStatusScheme.index(
    {
        WorkspaceId: 1,
        name: 1
    },
    {
        unique: true
    }
)

const TaskStatus = mongoose.model("TaskStatus", taskStatusScheme)

module.exports = TaskStatus