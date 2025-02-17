import {Router} from "express";
import { adminLogin, createAdmin, deletAdmin, getAllAdmin } from "../controllers/admin";


const admin = Router();

admin.post('/login', adminLogin)

admin.post('/create', createAdmin)
admin.get("/all-admin", getAllAdmin)
admin.delete("/delete/:id", deletAdmin)



export default admin