import { z } from 'zod';

export const orderSimpleSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    companyInstagram: z.string().min(2, { message: 'Company info required' }),
    phone: z.string().regex(/^\+?[0-9\s\-()]{10,20}$/, { message: 'Invalid phone number' }),
    captchaToken: z.string().min(1, { message: 'Please complete the captcha' }),
});

export type OrderSimpleFormData = z.infer<typeof orderSimpleSchema>;

export const creatorSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    portfolioLink: z.string().url({ message: 'Please enter a valid URL' }),
    phone: z.string().regex(/^\+?[0-9\s\-()]{10,20}$/, { message: 'Invalid phone number' }),
    captchaToken: z.string().min(1, { message: 'Please complete the captcha' }),
});

export type CreatorFormData = z.infer<typeof creatorSchema>;
