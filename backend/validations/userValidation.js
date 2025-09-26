import { z } from "zod"
import mongoose from "mongoose"

export const createUserSchema = z.object({
    username: z.string().min(4, "username minimum 4 charecters"),
    password: z.string().min(8, "password minimum 8 charecters"),
    email: z.email("invalid email"),
    role_id: z
        .string()
        .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid role_id")
})

export const loginUserSchema = z.object({
    username: z.string().min(4, "username minimum 4 charecters"),
    password: z.string().min(8, "Password minimum 8 charecters")
})


export const updateUserSchema = z.object({
    password: z.string().optional(),
    role_id: z
        .string()
        .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid role_id")
        .optional(),
})
