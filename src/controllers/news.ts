import { asyncHandler } from "../middlewares/error";
import { NewsService } from "../services/news";
import { statusCode } from "../types/types";
import ErrorHandler from "../utils/ErrorClass";
import { sendResponse } from "../utils/sendResponse";
import { newsSchema } from "../zod/news";

export const createNews = asyncHandler(async (req, res) => {
  const { title, pdfLink, date } = newsSchema.parse(req.body);
  const news = await NewsService.createNews({ title, pdfLink, date });
  sendResponse(
    res,
    statusCode.Created,
    true,
    "News created successfully",
    news
  );
});

export const deleteNews = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    return next(
      new ErrorHandler("News id is required", statusCode.Bad_Request)
    );
  const news = await NewsService.findNewsById(id);
  if (!news)
    return next(new ErrorHandler("News not found", statusCode.Not_Found));
  await NewsService.deleteNews(id);
  sendResponse(res, statusCode.OK, true, "News deleted successfully", news);
});


export const getAllNews = asyncHandler(async (req, res) => {
  const news = await NewsService.getAllNews();
  sendResponse(res, statusCode.OK, true, "News fetched successfully", news);
});