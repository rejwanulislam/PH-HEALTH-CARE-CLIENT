import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import status from "http-status";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorService.getAllDoctors()
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        data: result,
        message: "Get all doctors successfully"
    })
})

export const DoctorController = {
    getAllDoctors
}