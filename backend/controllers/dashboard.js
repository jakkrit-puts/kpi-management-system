import TryCatch from "../middlewares/try-catch.js";
import { Kpi } from "../models/kpi.js";
import { KpiUpdate } from "../models/kpi_updates.js";
import mongoose from "mongoose";
import { checkFormatID } from "../utils/format.js";

export const KpiOverview = TryCatch(async (req, res) => {

    const groupStatusOverview = await Kpi.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);


    res.status(200).json({
        overview: groupStatusOverview
    })
})

export const kpiFilter = TryCatch(async (req, res) => {

    const filters = {};

    let userId = req.query.userId;
    let status = req.query.status;

    if (!checkFormatID(userId, res)) return;

    if (userId) {
        filters.assigned_user = userId;
    }

    if (status) {
        filters.status = status;
    }

    const kpis = await Kpi.find(filters)
        .populate("assigned_user", "_id username")
        .sort({ createdAt: -1 });


    res.status(200).json({
        filters_applied: {
            userId: userId,
            status: status
        },
        kpis: kpis
    })
})

export const analyzeAchieved = TryCatch(async (req, res) => {

    const { userId, status } = req.query;


    let match = {};

    if (userId) {
        if (!checkFormatID(userId, res)) return;
        match.updated_by = new mongoose.Types.ObjectId(userId);
    }

    if (status) {
        match.status = status;
    }

    const result = await Kpi.aggregate([
        { $match: match },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                achieved: {
                    $sum: { $cond: [{ $gte: ["$actual_value", "$target_value"] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                achievedPercentage: {
                    $cond: [
                        { $eq: ["$total", 0] },
                        0,
                        { $round: [{ $multiply: [{ $divide: ["$achieved", "$total"] }, 100] }, 2] }
                    ]
                }
            }
        }
    ]);

    res.status(200).json(result[0] || { achievedPercentage: 0 });
})

export const analyzeTrends = TryCatch(async (req, res) => {

    const { userId, status } = req.query;
    let newJSON;
    let match = {};

    if (userId) {
        if (!checkFormatID(userId, res)) return;
        match.updated_by = new mongoose.Types.ObjectId(userId);
    }

    if (status) {
        match.status = status;
    }

    const trends = await KpiUpdate.aggregate([
        { $match: match },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$updated_at" } },
                avgProgress: { $avg: "$updated_value" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    if (trends.length > 0) {
        newJSON = {
            month: trends[0]._id,
            avgProgress: parseFloat(trends[0].avgProgress).toFixed(2)
        };
    } else {
        newJSON = {
            month: null,
            avgProgress: "0.00"
        };
    }

    res.status(200).json(newJSON);


})

export const analyzeStatus = TryCatch(async (req, res) => {
    const { userId, status } = req.query;

    const allStatuses = ["On Track", "At Risk", "Off Track"];
    let match = {};

    if (userId) {
        if (!checkFormatID(userId, res)) return;
        match.assigned_user = new mongoose.Types.ObjectId(userId);
    }

    if (status) {
        match.status = status;
    }

    const statusDist = await Kpi.aggregate([
        { $match: match },
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);


    const resultMap = statusDist.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    const finalResult = allStatuses.map((status) => ({
        status,
        count: resultMap[status] || 0,
    }));

    res.status(200).json(finalResult);
});
