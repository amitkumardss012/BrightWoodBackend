import { z } from 'zod';

export const eventValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z
    .string({required_error: 'Date is required'})
    .transform((val) => {
      const [day, month, year] = val.split('/').map(Number);
      return new Date(year, month - 1, day); 
    }),
  
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  image: z
    .object({
      mimetype: z.string().refine(val => val.startsWith('image/'), {
        message: 'File must be an image',
      }),
      size: z.number().max(10 * 1024 * 1024, 'File size must be less than 2MB'),
    },{required_error: 'Image is required'})
});
