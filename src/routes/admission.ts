import { Router } from "express";
import { asyncHandler } from "../middlewares/error";
import { admissionValidationSchema } from "../zod/admission";
import Admission from "../models/admission";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";

const admission = Router();

admission.post(
  "/apply",
  asyncHandler(async (req, res, next) => {
    const {
      firstname,
      lastname,
      email,
      phone,
      gradeLevelApplyingFor,
      currentSchool,
    } = admissionValidationSchema.parse(req.body);

    const existingAdmission = await Admission.findOne({ email });
    if (existingAdmission) {
      return next(
        new ErrorHandler(
          "An admission with this email already exists",
          statusCode.Bad_Request
        )
      );
    }

    // Create a new admission record
    const admission = new Admission({
      firstname,
      lastname,
      email,
      phone,
      gradeLevelApplyingFor,
      currentSchool,
    });

    await admission.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Admission application submitted successfully",
      admission,
    });
  })
);

admission.get(
  "/all",
  asyncHandler(async (req, res) => {
    const admissions = await Admission.find().sort({ createdAt: -1 }); // Sort by latest

    if (!admissions || admissions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admissions found",
      });
    }

    // Return response
    res.status(200).json({
      success: true,
      count: admissions.length,
      admissions,
    });
  })
);

export default admission;
