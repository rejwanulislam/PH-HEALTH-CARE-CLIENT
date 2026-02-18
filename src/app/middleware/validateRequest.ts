import { NextFunction, Request, Response} from "express";
import * as z from "zod";

export const validateRequest = (zodObject: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parseResult = zodObject.safeParse(req.body);
    if (!parseResult.success) {
      next(parseResult.error);
    }
    req.body = parseResult.data;
    next();
  }
}