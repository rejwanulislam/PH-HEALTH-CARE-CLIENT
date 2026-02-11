import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { authService } from "./auth.service";


const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const paylod = req.body
        const result = await authService.registerPatient(paylod)
        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Patient registered successfully",
            data: result
        })
    })
    const loginUser = catchAsync(
        async (req: Request, res: Response) => {
            const { email, password } = req.body    
            const result = await authService.loginUser(email, password)
            sendResponse(res, {
                httpStatusCode: 200,
                success: true,
                message: "User logged in successfully",
                data: result
            })
        })
    export const authController = {
        registerPatient,
        loginUser
    }