import TryCatch from "../middlewares/try-catch.js";
import sanitize from "mongo-sanitize";
import bcrypt from "bcrypt"
import { User } from "../models/User.js"
import { createUserSchema } from "../validations/userValidation.js";
import { handleZodValidation } from "../utils/handleValidation.js";

export const create = TryCatch(async (req, res) => {

    const sanitizedBody = sanitize(req.body);

    const validation = createUserSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    const { username, password, role_id, email } = validation.data;

    const existingUsername = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if (existingUsername) {
        res.status(409).json({
            message: "Username already exists"
        })

        return
    }

    if (existingEmail) {
        res.status(409).json({
            message: "Email already exists"
        })

        return
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

export const login = async (req, res) => {
    res.status(200).json({
        "message": "ok user"
    })
}

export const logout = async (req, res) => {
    res.status(200).json({
        "message": "ok user"
    })
}

