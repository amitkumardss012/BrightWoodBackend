import { asyncHandler } from "../middlewares/error";
import { AdminService } from "../services/admin";
import { jwtService } from "../services/jwt";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { adminSchema } from "../zod/admin";
import bcrypt from "bcrypt";

// Create Admin Controller
export const createAdmin = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = adminSchema.parse(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  const adminExists = await AdminService.getAdminByEmail(email);
  if (adminExists)
    return next(new ErrorHandler("Admin already exists", statusCode.Conflict));

  const admin = await AdminService.createAdmin({
    name,
    email,
    password: hashedPassword,
    role,
  });
  return res
    .status(statusCode.OK)
    .json({ success: true, messsage: "Admin created successfully", admin });
});

// Admin Login Controller
export const adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new ErrorHandler(
        "email and password are required",
        statusCode.Bad_Request
      )
    );

  const admin = await AdminService.getAdminByEmail(email);
  if (!admin) {
    return next(new ErrorHandler("Invalid email", statusCode.Unauthorized));
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid password", statusCode.Unauthorized));
  }

  const token = jwtService.generateToken(admin._id.toString());

  return res
    .status(statusCode.OK)
    .header("Authorization", `Bearer ${token}`)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message: "Admin logged in successfully",
      admin: { ...admin.toObject(), password: undefined },
      token,
    });
});

// Get All Admin Controller
export const getAllAdmin = asyncHandler(async (req, res, next) => {
  const allAdmin = await AdminService.getAllAdmin();
  return res
    .status(statusCode.OK)
    .json({ success: true, message: "All Admins", admin: allAdmin });
});

// Delete Admin Controller
export const deletAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      new ErrorHandler("Admin id is required", statusCode.Bad_Request)
    );
  const admin = await AdminService.deleteAdmin(id);
  if (!admin)
    return next(new ErrorHandler("Admin not found", statusCode.Not_Found));
  return res
    .status(statusCode.OK)
    .json({ success: true, message: "Admin deleted successfully" });
});


// Admin Logout Controller
export const adminLogout = asyncHandler(async (req, res, next) => {
  res
    .status(statusCode.OK)
    .clearCookie("token")
    .json({ success: true, message: "Admin logged out successfully" });
});