import TryCatch from "../middlewares/try-catch.js"
import sanitize from "mongo-sanitize";
import { createKpiSchema, kpiUpdateProgressSchema, updateKpiSchema } from "../validations/kpiValidation.js";
import { handleZodValidation } from "../utils/handleValidation.js";
import { Kpi } from "../models/kpi.js"
import { KpiUpdate } from "../models/kpi_updates.js"
import { User } from '../models/user.js'
import { checkFormatID } from "../utils/format.js";
import sendMail from "../configs/sendEmail.js";
import { getNotiHtml } from "../templates/mailHtml.js";

export const createKPI = TryCatch(async (req, res) => {

    const sanitizedBody = sanitize(req.body);

    const validation = createKpiSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    const { title, description, target_value, actual_value, status, assigned_user, start_date,
        end_date
    } = validation.data;

    const newKpi = await Kpi.create({
        title: title,
        description: description,
        target_value: target_value,
        actual_value: actual_value,
        status: status,
        assigned_user: assigned_user,
        start_date: start_date,
        end_date: end_date
    })

    const user = await User.findById(assigned_user);

    const html = getNotiHtml({ email: user.email, title: newKpi.title })

    if (user) {
        await sendMail({
            to: user.email,
            subject: `-- KPI Assigned Notification --`,
            html: html
        });
    }

    res.status(201).json({
        message: "kpi created.",
        kpi: newKpi
    })
})

export const listKPI = TryCatch(async (req, res) => {

    const role = req.user.role_id.name
    const userId = req.user._id
    let kpis;

    if (role === "admin") {
        kpis = await Kpi.find().populate("assigned_user", "_id username").sort({ createdAt: -1 });
    }

    if (role === "user") {
        kpis = await Kpi.find({ assigned_user: userId }).populate("assigned_user", "_id username").sort({ createdAt: -1 });
    }

    res.status(200).json({
        kpis: kpis
    })
})

export const updateKPI = TryCatch(async (req, res) => {

    const { id } = req.params;
    const sanitizedBody = sanitize(req.body);

    const validation = updateKpiSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    if (!checkFormatID(id, res)) return;

    const kpi = await Kpi.findById(id);
    if (!kpi) return res.status(404).json({ message: "Kpi Notfound" });

    const { title, description, target_value, actual_value, status,
        assigned_user, start_date, end_date
    } = validation.data;

    const updateData = {
        title: title,
        description: description,
        target_value: target_value,
        actual_value: actual_value,
        status: status,
        assigned_user: assigned_user,
        start_date: start_date,
        end_date: end_date
    };

    const updatedKpi = await Kpi.findByIdAndUpdate(id, updateData, { new: true }).populate("assigned_user", "_id username");

    res.status(200).json({ message: "KPI updated", kpi: updatedKpi });
})

export const detailKPI = TryCatch(async (req, res) => {

    const { id } = req.params

    if (!checkFormatID(id, res)) return;

    const kpi = await Kpi.findOne({ _id: id }).populate("assigned_user", "_id username")

    if (!kpi) {
        return res.status(404).json({
            message: "Kpi Notfound."
        })
    }

    res.status(200).json({
        kpi: kpi
    })
})

export const removeKPI = TryCatch(async (req, res) => {
    const { id } = req.params

    if (!checkFormatID(id, res)) return;

    const result = await Kpi.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Kpi Notfound." });
    }

    res.status(200).json({ message: "Kpi deleted successfully." });
})

// for user
export const listUpdateKpi = TryCatch(async (req, res) => {
    const { id } = req.params

    if (!checkFormatID(id, res)) return;

    const kpiUpdateList = await KpiUpdate.find({ kpi_id: id }).populate("updated_by", "_id username")

    res.status(200).json({
        kpis_progress: kpiUpdateList
    })
})

export const addUpdateKpi = TryCatch(async (req, res) => {

    const { id } = req.params
    const userId = req.user._id;

    if (!checkFormatID(id, res)) return;

    const sanitizedBody = sanitize(req.body);

    const validation = kpiUpdateProgressSchema.safeParse(sanitizedBody);

    const errorResponse = handleZodValidation(validation, res);
    if (errorResponse) return;

    const { updated_value, comment } = validation.data;

    const kpi = await Kpi.findById(id);
    if (!kpi) return res.status(404).json({ message: "Kpi Notfound" });

    const kpiOwner = await Kpi.findOne({ assigned_user: userId, _id: id });

    if (!kpiOwner) return res.status(403).json({ message: "Forbidden: Not KPI owner" });

    await KpiUpdate.create({
        kpi_id: id,
        updated_value: updated_value,
        comment: comment,
        updated_by: userId
    })

    kpi.actual_value = updated_value;
    await kpi.save();

    res.status(201).json({
        message: "kpi progress update.",
    })

})