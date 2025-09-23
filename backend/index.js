import express from 'express'
import dotenv from 'dotenv'
// sub routes
import connectDB from './configs/db.js'
import userRoutes from './routes/user.js'

dotenv.config();

// DB 
await connectDB()

const app = express()

const PORT = process.env.PORT || 3000

// middlewares

// group v1
app.use("/api/v1", userRoutes)

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})