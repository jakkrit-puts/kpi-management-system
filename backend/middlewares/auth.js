import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
    try {

        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                message: "Please Login token require !!!",
            });
        }

        const decodeData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        if (!decodeData) {
            return res.status(400).json({
                message: "token expired",
            });
        }

        const user = await User.findById(decodeData.id).select("-password_hash -createdAt").populate("role_id");

        if (!user) {
            return res.status(400).json({
                message: "Not found user.",
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}