import { model, Schema } from "mongoose";
import { NewsType } from "../zod/news";

const newsSchema = new Schema<NewsType>({
    title: {
        type: String,
        required: true
    },
    pdfLink: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {timestamps: true})

const News = model<NewsType>("News", newsSchema);

export default News