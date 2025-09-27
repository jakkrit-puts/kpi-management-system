import mongoose from "mongoose";

export const checkFormatID = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid ID format" });

        return false;
    }

    return true;
}

export const convertMonth = (date) => {
    const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    ];

    const monthNumber = parseInt(date.split("-")[1], 10);
    const monthName = thaiMonths[monthNumber - 1];

    return monthName;
}