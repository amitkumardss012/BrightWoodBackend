import { model, Schema } from "mongoose";
import { AdminType } from "../zod/admin";

const adminSchema = new Schema<AdminType>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "sub-admin"],
        required: true
    }
}, {timestamps: true})

const Admin = model<AdminType>("Admin", adminSchema);

export default Admin