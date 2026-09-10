const mongoose = require('mongoose')

const membershipScheme = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },

        role: { type: String, required: true, lowercase: true, trim: true },
        joinedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
)

membershipScheme.index(
    {
        userId: 1,
        workspaceId: 1
    },
    {
        unique: true
    }
)

const Membership = mongoose.model("Membership", membershipScheme)

module.exports = Membership