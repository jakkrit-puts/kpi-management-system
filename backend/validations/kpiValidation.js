import { z } from "zod"
import mongoose from "mongoose"

export const createKpiSchema = z.object({
    title: z.string().min(3, "Title is required"),
    description: z.string().optional(),
    target_value: z.number().positive("Target value must be positive"),
    actual_value: z.number().optional().default(0),
    status: z.enum(["On Track", "At Risk", "Off Track"]).optional(),
    assigned_user: z
        .string()
        .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid role_id"),
    start_date: z.string(),
    end_date: z.string()
})

export const updateKpiSchema = z.object({
    title: z.string().min(3, "Title is required").optional(),
    description: z.string().optional(),
    target_value: z.number().positive("Target value must be positive").optional(),
    actual_value: z.number().optional(),
    status: z.enum(["On Track", "At Risk", "Off Track"]).optional(),
    assigned_user: z
        .string()
        .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid role_id").optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional()
})

