import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, searchBlogsByTitle } from "../controllers/blog";
import { multerUpload } from "../middlewares/multer";

const blog = Router();

blog.post("/create", multerUpload.single("image"), createBlog);
blog.delete("/delete/:id", deleteBlog);
blog.get("/all", getAllBlogs);
blog.get("/search", searchBlogsByTitle);

export default blog;