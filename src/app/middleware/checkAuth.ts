import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { jwtUtils } from "../utils/jwt";
import status from "http-status";
import { cookieUtils } from "../utils/cookie";
import { envVars } from "../../config/env";
import { prisma } from "../lib/prisma";
import { time } from "node:console";
import { userStatus } from "../../generated/prisma/enums";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const seationToken = cookieUtils.getCookie(req, "better-auth.session_token");
        if (!seationToken) {
            throw new AppError(status.UNAUTHORIZED, "Unauthorized access no seassion token provided")
        }

        if (seationToken) {
            const seationExist = await prisma.session.findFirst({
                where: {
                    token: seationToken,
                    expiresAt: {
                        gt: new Date()
                    }
                }, include: {
                    user: true
                }
            })

            if (seationExist && seationExist.user) {
                const user = seationExist.user
                const now = new Date()
                const expiresAt = new Date(seationExist.expiresAt)
                const createdAt = new Date(seationExist.createdAt)

                const seationLifeTime = expiresAt.getTime() - createdAt.getTime()
                const timeRemaining = expiresAt.getTime() - now.getTime()
                const percentageRemaining = (timeRemaining / seationLifeTime) * 100


                if (percentageRemaining < 20) {
                    res.setHeader("x-seation-refresh-token", "true")
                    res.setHeader("x-seation-refresh-token", expiresAt.toISOString())
                    res.setHeader("x-seation-refresh-token", timeRemaining.toString())

                    console.log("seation expire soon!!")
                }

              if (user.status === userStatus.DELETED || user.status == userStatus.BlOCKED) {
                    throw new AppError(status.FORBIDDEN, "User is blocked or deleted")
                }
                
                if(user.isDeleted){
                    throw new AppError(status.FORBIDDEN, "User is deleted")
                }

                if(authRoles.length > 0 && !authRoles.includes(user.role)){
                    throw new AppError(status.FORBIDDEN, "Forbidden access you don't have permission to access this resource")
                }
            }

             if (!seationToken) {
                throw new AppError(status.UNAUTHORIZED, "Unauthorized access no seassion token provided")
            }

            const accessToken = cookieUtils.getCookie(req, "accessToken");
            if (!accessToken) {
                throw new AppError(status.UNAUTHORIZED, "Unauthorized access no access token provided")
            }
            const verifiedToken = jwtUtils.veryfyToken(accessToken, envVars.ACCESS_TOKEN_SECRET)
            if (!verifiedToken.success) {
                throw new AppError(status.UNAUTHORIZED, "Unauthorized access invalid access token")
            }

            if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role)) {
                throw new AppError(status.FORBIDDEN, "Forbidden access you don't have permission to access this resource")
            }
        }
        next()
    } catch (error: any) {
        next(error)
    }

}