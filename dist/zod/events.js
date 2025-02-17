"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidationSchema = void 0;
const zod_1 = require("zod");
exports.eventValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    date: zod_1.z
        .string({ required_error: 'Date is required' })
        .transform((val) => {
        const [day, month, year] = val.split('/').map(Number);
        return new Date(year, month - 1, day);
    }),
    time: zod_1.z.string().min(1, 'Time is required'),
    location: zod_1.z.string().min(1, 'Location is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    image: zod_1.z
        .object({
        mimetype: zod_1.z.string().refine(val => val.startsWith('image/'), {
            message: 'File must be an image',
        }),
        size: zod_1.z.number().max(10 * 1024 * 1024, 'File size must be less than 2MB'),
    }, { required_error: 'Image is required' })
});
