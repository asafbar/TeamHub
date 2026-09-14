const mongoose = require('mongoose')

const taskScheme = new mongoose.Schema(
    {
        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },
        
        title: {type: String, required: true, trim: true},
        description: {type: String, trim: true, default: null},
        
        statusId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskStatus",
            required: true
        },

        priorityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskPriority",
            required: true
        },
        
        assigneeMembershipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Membership",
            default: null
        },

        createdByUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        dueDate: {type: Date, default: null},
        position: {type: Number, required: true}
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model("Task", taskScheme)

module.exports = Task