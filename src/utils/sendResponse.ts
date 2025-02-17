import { Response } from "express";

export const sendResponse = (res: Response, statusCode: number, success: boolean, message: string, data: any) => {
    res.status(statusCode).json({ success, message, data });
};



class SendResponse {
    res: Response;
    statusCode: number;
    success: boolean;
    message: string;
    data: any = null;
  
    constructor(res: Response, statusCode: number, success: boolean, message: string, data: any = null) {
      this.res = res;
      this.statusCode = statusCode;
      this.success = success;
      this.message = message;
      this.data = data;
    }
  }
