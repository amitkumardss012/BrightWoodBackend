import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorClass";
import { ZodError } from "zod";
import { statusCode } from "../types/types";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  // handle Zod error
  if (err instanceof ZodError) {
    const zodErr = zodError(err);
     res.status(statusCode.Bad_Request).json({
      success: false,
      message: "Validation Error",
      errors: zodErr,
    });
  }else {
    // Final Error Response
   res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  }
};

const zodError = (error: ZodError) => {
  let errors: any = {};
  error.errors.map((issue) => {
    const path = issue.path?.[0];
    if (path) errors[path] = issue.message;
  });
  return errors;
};

type AsyncHandlerFunction<TReq extends Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  <TReq extends Request>(fn: AsyncHandlerFunction<TReq>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as TReq, res, next)).catch(next);
  };
