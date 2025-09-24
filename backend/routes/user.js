import express from 'express'
import { create, login, profile } from '../controllers/user.js'
import { isAuth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/checkRole.js'

const router = express.Router()

router.post("/create", [isAuth, authAdmin], create)
router.post("/login", login)
router.get("/profile", [isAuth], profile)

export default router