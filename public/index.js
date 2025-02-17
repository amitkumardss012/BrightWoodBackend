"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./DB/db");
const error_1 = require("./middlewares/error");
const env_1 = require("./utils/env");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// Impoting All the Routes
const admin_1 = __importDefault(require("./routes/admin"));
const news_1 = __importDefault(require("./routes/news"));
const gallery_1 = __importDefault(require("./routes/gallery"));
const events_1 = __importDefault(require("./routes/events"));
const blog_1 = __importDefault(require("./routes/blog"));
const admission_1 = __importDefault(require("./routes/admission"));
// All the instance
const app = (0, express_1.default)();
// Connet to DB
(0, db_1.connectDB)();
// All the Middleware
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.get("/", (req, res) => {
    res.send("hello");
});
// All the Routes
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/news", news_1.default);
app.use("/api/v1/gallery", gallery_1.default);
app.use("/api/v1/event", events_1.default);
app.use("/api/v1/blog", blog_1.default);
app.use("/api/v1/admission", admission_1.default);
// Error Middleware
app.use(error_1.errorMiddleware);
app.listen(env_1.env.port, () => console.log("server started on port " + env_1.env.port));
