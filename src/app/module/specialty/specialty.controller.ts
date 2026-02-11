import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { specialtyService } from "./specialty.service";




const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const paylod = req.body

        const result = await specialtyService.createSpecialty(paylod)

        sendResponse(res,{
           httpStatusCode:201,
           success:true,
           message:"specialty created successfully",
           data :result
        })

    })



const getAllSpecialty = catchAsync(
    async (req, res) => {
        const result = await specialtyService.getAllSpecialty()
           sendResponse(res,{
           httpStatusCode:201,
           success:true,
           message:"specialty fetched successfully",
           data :result
        })

    }
)
const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params

        const result = await specialtyService.deleteSpecialty(id as string)
        
        
              sendResponse(res,{
           httpStatusCode:201,
           success:true,
           message:"specialty deleted successfully",
           data :result
        })
       
    }
)


export const specialtyController = {
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}