import express from 'express'
import { create, listUser, removeUser, updatePassword, userDetail } from '../controllers/user.js'
import { isAuth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/checkRole.js'

const router = express.Router()

router.post("/", [isAuth, authAdmin], create)
router.get("/", [isAuth, authAdmin], listUser)
router.get("/:id", [isAuth, authAdmin], userDetail)
router.put("/:id", [isAuth, authAdmin], updatePassword)
router.delete("/:id", [isAuth, authAdmin], removeUser)


export default router