import {Router} from "express";
import { createNews, deleteNews, getAllNews } from "../controllers/news";
import isAdmin from "../middlewares/admin";

const news = Router();

news.get("/all", getAllNews)

news.use(isAdmin)
news.post("/create", createNews)
news.delete("/delete/:id", deleteNews)

export default news