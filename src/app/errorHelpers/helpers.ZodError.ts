import status from "http-status";
import z from "zod"
import { TErrorResponse, TerrorSource } from "../interface/error.interface";

export const handlaeZodError = (err: z.ZodError):TErrorResponse => {
     const statusCode = status.BAD_REQUEST;
        const meassage = "Zod Validation Error";
        const errorSource: TerrorSource[] = [];
        err.issues.forEach((issue: any) => {
            errorSource.push({
                path: issue.path.length > 0 ? issue.path.join(".") : issue.path.toString(),
                meassage: issue.message
            })
        })

        return {
            success: false,
            message: meassage,
            errorSource,
            statuscode: statusCode
        }
}