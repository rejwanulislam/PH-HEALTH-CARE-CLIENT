import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { tokenUtils } from "../../utils/token";


const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const paylod = req.body
        const result = await authService.registerPatient(paylod)
        const { accessToken, refreshToken, token, ...rest } = result

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthSeationCookie(res, accessToken, refreshToken)

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Patient registered successfully",
            data: {
                token,
                accessToken,
                refreshToken,
                ...rest
            }
        })
    })
const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const { email, password } = req.body
        const result = await authService.loginUser(email, password)
        const { accessToken, refreshToken, token, ...rest } = result

        tokenUtils.setAccessTokenCookie(res, accessToken)
        tokenUtils.setRefreshTokenCookie(res, refreshToken)
        tokenUtils.setBetterAuthSeationCookie(res, accessToken, refreshToken)
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: {
                token,
                accessToken,
                ...rest
            }
        })
    })
export const authController = {
    registerPatient,
    loginUser
}