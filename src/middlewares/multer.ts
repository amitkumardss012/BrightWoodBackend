import multer from "multer";

const storage = multer.memoryStorage();

export const multerUpload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024  }, // Limit file size to 10KB
  fileFilter: (_, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png, image/webp"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG and WEBP images are allowed"));
    }
    if(file.size > 10 * 1024){
      cb(new Error("File size is too largeeee"));
    }
  },
});
