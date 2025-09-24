import mongoose from "mongoose";

export const checkFormatID = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid ID format" });

        return false;
    }

    return true;
}