import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.router";
import { UserRoute } from "../module/user/user.route";
import { DoctorRoute } from "../module/doctor/doctor.route";

const router=Router()
router.use('/specialtys',specialtyRoutes)
router.use('/auth',authRoutes)
router.use('/users',UserRoute)
router.use('/doctors',DoctorRoute)
export const IndexRoutes=router