import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['admin', 'user']
    },
}, { timestamps: true })

export const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);