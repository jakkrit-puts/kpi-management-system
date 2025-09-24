import TryCatch from "../middlewares/try-catch.js";
import sanitize from "mongo-sanitize";
import bcrypt from "bcrypt"
import { User } from "../models/user.js"
import { loginUserSchema } from "../validations/userValidation.js";
import { handleZodValidation } from "../utils/handleValidation.js";
import { generateToken } from "../utils/jwtToken.js";


export const login = TryCatch(async (req, res) => {

    const sanitizedBody = sanitize(req.body);

    const validation = loginUserSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    const { username, password } = validation.data;

    const user = await User.findOne({ username }).populate("role_id");;

     if (!user) {
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password_hash);

    if (!comparePassword) {
        return res.status(401).json({
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

