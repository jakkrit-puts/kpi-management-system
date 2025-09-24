import TryCatch from "../middlewares/try-catch.js";
import sanitize from "mongo-sanitize";
import bcrypt from "bcrypt"
import { User } from "../models/User.js"
import { createUserSchema, loginUserSchema } from "../validations/userValidation.js";
import { handleZodValidation } from "../utils/handleValidation.js";
import { generateToken } from "../utils/jwtToken.js";

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

export const login = TryCatch(async (req, res) => {

    const sanitizedBody = sanitize(req.body);

    const validation = loginUserSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    const { username, password } = validation.data;

    const user = await User.findOne({ username }).populate("role_id");;

    const comparePassword = await bcrypt.compare(password, user.password_hash);

    if (!comparePassword) {
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }

    const userResponse = {
        _id: user._id,
        username: user.username,
        role: user.role_id.name
    }

    const tokenData = await generateToken(user._id);

    res.status(200).json({
        "message": "login successfully",
        user: userResponse,
        accessToken: tokenData.accessToken
    })
})

export const profile = async (req, res) => {

    const user = req.user;

    res.status(200).json({
        "message": "get profile successfully",
        "user": user
    })
}

