import express from 'express'
import { createKPI, listKPI, removeKPI, updateKPI, detailKPI, listUpdateKpi, addUpdateKpi } from '../controllers/kpi.js'
import { isAuth } from '../middlewares/auth.js'
import { authAdmin, authUser } from '../middlewares/checkRole.js'

const router = express.Router()

router.post("/", [isAuth, authAdmin], createKPI)
router.get("/", [isAuth], listKPI)
router.get("/:id", [isAuth], detailKPI)
router.put("/:id", [isAuth, authAdmin], updateKPI)
router.delete("/:id", [isAuth, authAdmin], removeKPI)

// kpis update progress
router.get("/:id/updates", [isAuth], listUpdateKpi)
router.post("/:id/updates", [isAuth, authUser], addUpdateKpi)

export default router