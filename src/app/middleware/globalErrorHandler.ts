import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import status from "http-status";
import z from "zod";
import { error } from "node:console";
import { TErrorResponse, TerrorSource } from "../interface/error.interface";
import { handlaeZodError } from "../errorHelpers/helpers.ZodError";
import AppError from "../errorHelpers/AppError";



export const grobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (envVars.NODE_ENV === "development") {
        console.error("Error caught by middleware:", err);
    }
    let errorSource: TerrorSource[] = []
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let meassage = "Internal Server Error";
    let stack: string | undefined = undefined;
    if (err instanceof z.ZodError) {
        const simplifiedError = handlaeZodError(err);
        statusCode = simplifiedError.statuscode as number;
        meassage = simplifiedError.message;
        stack = err.stack;
        errorSource = [...simplifiedError.errorSource!]
    } else if (err instanceof AppError) {

        statusCode = err.statusCode;
        meassage = err.message;
        stack = err.stack;
        errorSource = [
            {
                path: '',
                meassage: err.message
            }
        ]
    }

    else if (err instanceof Error) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        meassage = err.message;
        stack = err.stack;
    }


    const errorResponse: TErrorResponse = {
        success: false,
        errorSource,
        message: meassage,
        stack: envVars.NODE_ENV === "development" ? stack : undefined,
        error: envVars.NODE_ENV === "development" ? err : undefined
    }
    res.status(statusCode).json(errorResponse);


}
