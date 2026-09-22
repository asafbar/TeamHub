const mongoose = require('mongoose')

const userScheme = new mongoose.Schema(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        avatar: { type: String, default: null },
        theme: { 
            type: String,
            enum: ["dark", "light"],
            default: "light"
        }
    }, 
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userScheme)

module.exports = User