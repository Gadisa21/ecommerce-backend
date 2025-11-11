import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ error: 'Product name is required' })
      .min(3, 'Name must be at least 3 characters long')
      .max(100, 'Name must be 100 characters or less'),

    description: z
      .string({ error: 'Description is required' })
      .min(10, 'Description must be at least 10 characters long'),

    price: z
      .number({ error: 'Price is required' })
      .positive('Price must be a positive number'),

    stock: z
      .number({ error: 'Stock is required' })
      .int('Stock must be an integer')
      .nonnegative('Stock cannot be a negative number'),

    category: z
      .string({ error: 'Category is required' })
      .min(1, 'Category cannot be empty'),
  }),
});