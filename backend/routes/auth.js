import express from 'express'
import { login, profile } from '../controllers/auth.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.post("/login", login)
router.get("/profile", [isAuth], profile)

export default router