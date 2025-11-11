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

export const updateProductSchema = z.object({

  params: z.object({
    id: z.string().uuid('A valid product ID must be provided.'),
  }),
 
  body: z
    .object({
      name: z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .max(100, 'Name must be 100 characters or less'),

      description: z
        .string()
        .min(10, 'Description must be at least 10 characters long'),

      price: z.number().positive('Price must be a positive number'),

      stock: z
        .number()
        .int('Stock must be an integer')
        .nonnegative('Stock cannot be a negative number'),

      category: z.string().min(1, 'Category cannot be empty'),
    })
    .partial() 
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided to update.', 
    }),
});

export const getProductsSchema = z.object({
  query: z.object({
    page: z.coerce
      .number({ error: 'Page must be a number' })
      .int()
      .positive()
      .optional(), 

    pageSize: z.coerce
      .number({ error: 'Page size must be a number' })
      .int()
      .positive()
      .optional(),
  }),
});