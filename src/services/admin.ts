import Admin from "../models/admin";
import { AdminType } from "../zod/admin";

export class AdminService {
    public static async createAdmin(data: AdminType) {
        const admin = await Admin.create(data)
        return admin
    }
    public static async getAdminByEmail(email: string) {
        const admin = await Admin.findOne({ email })
        return admin
    }
    public static async getAdminById(id: string) {
        const admin = await Admin.findById(id)
        return admin
    }
    public static async getAllAdmin() {
        const admin = await Admin.find()
        return admin
    }
    public static async getAdminOriginalPassword(adminId: string): Promise<string | null> {
        const admin = await Admin.findById(adminId);
        return admin ? admin.password : null;
    }

    public static async deleteAdmin(id: string) {
        const admin = await Admin.findByIdAndDelete(id)
        return admin
    }
}