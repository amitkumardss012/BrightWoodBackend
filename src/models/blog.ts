import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  heading: string;
  content: string;
  author: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema: Schema<IBlog> = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
      maxlength: [150, "Heading cannot exceed 150 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
      
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
