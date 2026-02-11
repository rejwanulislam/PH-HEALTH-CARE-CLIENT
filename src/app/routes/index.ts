import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.router";

const router=Router()
router.use('/specialtys',specialtyRoutes)
router.use('/auth',authRoutes)
export const IndexRoutes=router