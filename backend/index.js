import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
// sub routes
import connectDB from './configs/db.js'
import { seedRoles } from './models/seeds/seedRoles.js';

import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import kpiRoutes from './routes/kpi.js'

dotenv.config();

// DB 
await connectDB()

const app = express()

// seed data
await seedRoles();

// middlewares
app.set('trust proxy', 1);
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// group v1
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/kpis", kpiRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})