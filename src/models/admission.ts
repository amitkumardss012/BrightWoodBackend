import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmission extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gradeLevelApplyingFor: string;
  currentSchool: string;
}

// Admission Schema
const admissionSchema: Schema<IAdmission> = new Schema<IAdmission>(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"],
    },
    gradeLevelApplyingFor: {
      type: String,
      required: [true, "Grade level is required"],
    },
    currentSchool: {
      type: String,
      required: [true, "Current school is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admission: Model<IAdmission> = mongoose.model<IAdmission>(
  "Admission",
  admissionSchema
);

export default Admission;
