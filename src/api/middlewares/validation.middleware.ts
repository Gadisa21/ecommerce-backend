import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export const validate =
  (schema: z.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);
        return res.status(400).json({
          success: false,
          message: 'Input Validation Failed',
          object: null,
          errors: errorMessages,
        });
      }
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        errors: ['An unexpected error occurred.'],
      });
    }
  };