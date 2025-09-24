import express from 'express'
import { isAuth } from '../middlewares/auth.js'
import { authAdmin } from '../middlewares/checkRole.js'
import { analyzeAchieved, analyzeStatus, analyzeTrends, kpiFilter, KpiOverview } from '../controllers/dashboard.js'

const router = express.Router()

router.get("/kpi-overview", [isAuth, authAdmin], KpiOverview)
router.get("/kpis", [isAuth, authAdmin], kpiFilter)

router.get("/analytics/achieved", [isAuth, authAdmin], analyzeAchieved)
router.get("/analytics/trends", [isAuth, authAdmin], analyzeTrends)
router.get("/analytics/status", [isAuth, authAdmin], analyzeStatus)

export default router