
import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    username: z
      .string({ error: 'Username is required' })
      .min(3, 'Username must be at least 3 characters long')
      .regex(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric'),
    email: z
      .string({ error: 'Email is required' })
      .email('Not a valid email'),
    password: z
      .string({ error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
      .regex(/[a-z]/, 'Password must include at least one lowercase letter')
      .regex(/[0-9]/, 'Password must include at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must include at least one special character'),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ error: 'Email is required' })
      .email('Not a valid email'),
    password: z
      .string({ error: 'Password is required' }),
  }),
});