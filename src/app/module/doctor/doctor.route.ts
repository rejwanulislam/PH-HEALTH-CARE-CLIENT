import { Router } from "express";
import { DoctorController } from "./doctor.controllrt";

const router=Router()
router.get('/', DoctorController.getAllDoctors)

export const DoctorRoute=router