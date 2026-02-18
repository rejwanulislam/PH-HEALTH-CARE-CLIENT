import { UserController } from "./user.controller";
import { Gender } from "../../../generated/prisma/enums";
import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";







const router = Router()
router.post('/create-doctor',validateRequest(createDoctorZodSchema), UserController.createDoctor)

export const UserRoute = router