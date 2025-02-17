import { AdminService } from "../services/admin";
import { jwtService } from "../services/jwt";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { asyncHandler } from "./error";

const isAdmin = asyncHandler(async (req, res, next) => {
  const token =
    req.headers["authorization"]?.split("Bearer ")[1]?.trim() ||
    req.headers.cookie?.split("=")[1]?.trim();


  if (!token) {
    return next(new ErrorHandler("you are not authorized", statusCode.Unauthorized));
  }
  const decoded = jwtService.verifyToken(token) as { id: string };
  const admin = await AdminService.getAdminById(decoded.id);
  if (!admin) {
    return next(new ErrorHandler("you are not authorized as admin", statusCode.Not_Found));
  }

  req.admin = admin;
  next();
});

export default isAdmin;
