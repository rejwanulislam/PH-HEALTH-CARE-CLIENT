import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync=(fn:RequestHandler)=>{
return async function(req:Request,res:Response,next:NextFunction){
try {
   await fn(req,res,next) 
} catch (error:any) {
    next(error)
}
}
}



interface IResponseData<T> {
    httpStatusCode: number;
    success: boolean;
    message: string;
    data?: T;
}

export const sendResponse = <T>(res: Response, responseData: IResponseData<T>) => {
 const {httpStatusCode,success,message,data}=responseData
 res.status(httpStatusCode).json({
    success,
    message,
    data

 }) 
}