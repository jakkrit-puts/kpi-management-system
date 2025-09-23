import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password_hash: {
        type: String,
        required: true,
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Role'
    }
}, { timestamps: true })

export const User = mongoose.model("User", UserSchema)