import TryCatch from "../middlewares/try-catch.js";
import sanitize from "mongo-sanitize";
import bcrypt from "bcrypt"
import { User } from "../models/User.js"
import { createUserSchema } from "../validations/userValidation.js";
import { handleZodValidation } from "../utils/handleValidation.js";
import { checkFormatID } from "../utils/format.js";

export const create = TryCatch(async (req, res) => {

    const sanitizedBody = sanitize(req.body);

    const validation = createUserSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    const { username, password, role_id, email } = validation.data;

    const existingUsername = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if (existingUsername) {
        return res.status(409).json({
            message: "Username already exists"
        })
    }

    if (existingEmail) {
        return res.status(409).json({
            message: "Email already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username: username,
        email: email,
        password_hash: hashPassword,
        role_id: role_id
    })

    res.status(201).json({
        message: "your account has been created.",
        user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        },
    })
})

export const listUser = TryCatch(async (req, res) => {
    const users = await User.find().select("-password_hash").populate("role_id");

    res.status(200).json({
        users: users
    })
})

export const userDetail = TryCatch(async (req, res) => {

    const { id } = req.params

    if (!checkFormatID(id, res)) return;

    const user = await User.findOne({ _id: id }).select("-password_hash").populate("role_id");

    if (!user) {
        return res.status(404).json({
            message: "User Notfound."
        })
    }

    res.status(200).json({
        user: user
    })
})

export const updatePassword = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!checkFormatID(id, res)) return;

    const user = await User.findById(id).select("+password_hash");
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;

    await user.save();

    res.status(200).json({ message: "password updated successfully." });
});

export const removeUser = TryCatch(async (req, res) => {
    const { id } = req.params

    if (!checkFormatID(id, res)) return;

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User Notfound." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
})