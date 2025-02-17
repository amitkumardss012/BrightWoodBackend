import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
