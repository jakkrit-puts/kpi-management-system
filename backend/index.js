import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
// sub routes
import connectDB from './configs/db.js'
import { seedRoles } from './models/seeds/seedRoles.js';
import { seedUsers } from './models/seeds/seedUsers.js';

import userRoutes from './routes/user.js'
import authRoutes from './routes/auth.js'
import kpiRoutes from './routes/kpi.js'
import dashboardRoutes from './routes/dashboard.js'

dotenv.config();

// DB 
await connectDB()

const app = express()

// seed data
await seedRoles();
await seedUsers();


// middlewares
app.set('trust proxy', 1);
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get("/health", (req, res) => {
    res.status(200).json({
        "message": "service available"
    })
})

// group v1
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/kpis", kpiRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})