import { NextFunction, Request, Response, Router } from "express";
import { specialtyController } from "./specialty.controller";
import { cookieUtils } from "../../utils/cookie";
import status from "http-status";
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../../config/env";
import AppError from "../../errorHelpers/AppError";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";

    


const router = Router()
router.post('/', specialtyController.createSpecialty)
router.get('/', checkAuth(Role.ADMIN), specialtyController.getAllSpecialty)
router.delete('/:id', specialtyController.deleteSpecialty)

export const specialtyRoutes = router