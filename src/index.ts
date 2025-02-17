import express from "express"
import { connectDB } from "./DB/db";
import { errorMiddleware } from "./middlewares/error";
import { env } from "./utils/env";
import path from "path"
import cors from "cors"


// Impoting All the Routes
import adminRoute from "./routes/admin"
import newsRoute from "./routes/news"
import galleryRoute from "./routes/gallery";
import eventRoute from "./routes/events"
import blogRoute from "./routes/blog"
import admissionRoute from "./routes/admission"


// All the instance
const app = express();


// Connet to DB
connectDB()


// All the Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors({
    origin: [process.env.FRONTEND_URL!, process.env.FRONTEND_URL!],
    methods: ["GET", "POST", "PUT", "DELETE"],
}))


app.get("/", (req, res) => {
    res.send("hello")
})

// All the Routes
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/news", newsRoute)
app.use("/api/v1/gallery", galleryRoute)
app.use("/api/v1/event", eventRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/admission", admissionRoute)

// Error Middleware
app.use(errorMiddleware)


app.listen(env.port, () => console.log("server started on port " + env.port))