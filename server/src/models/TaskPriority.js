const mongoose = require('mongoose')

const taskPriorityScheme = new mongoose.Schema(
    {
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },

        name: { type: String, required: true, trim: true },
        position: {type: Number, required: true}
    },
    {
        timestamps: true
    }
)

taskPriorityScheme.index(
    {
        workspaceId: 1,
        name: 1
    },
    {
        unique: true
    }
)

const TaskPriority = mongoose.model("TaskPriority", taskPriorityScheme)

module.exports = TaskPriority