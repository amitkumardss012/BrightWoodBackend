// src/services/newsService.ts
import News from "../models/news";
import { NewsType } from "../zod/news";

// Service to handle news-related operations
export class NewsService {
    public static async createNews(newsData: NewsType) {
        const news = await News.create(newsData);
        return news;
    }

    public static async deleteNews(id: string) {
        const news = await News.findByIdAndDelete(id);
        return news;
    }

    public static async findNewsById(id: string) {
        const news = await News.findById(id);
        return news;
    }

    public static async getAllNews() {
        const news = await News.find();
        return news;
    }
}
