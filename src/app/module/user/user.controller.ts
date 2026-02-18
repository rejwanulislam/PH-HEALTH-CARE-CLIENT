import { Request, Response } from "express";
import { Prisma } from "../../../generated/prisma/client";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { UserService } from "./user.service";
import status from "http-status";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const doctor = await UserService.createDoctor(payload)
    sendResponse(res, {
        httpStatusCode: status.CREATED,
        message: "Doctor created successfully",
        success: true,
        data: doctor
    })
}
)


export const UserController = {
    createDoctor
}