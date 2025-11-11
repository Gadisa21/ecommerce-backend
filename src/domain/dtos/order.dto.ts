import { z } from "zod";
export const createOrderSchema = z.object({
  body: z
    .array(
      z.object({
        productId: z
          .string({ error: "Product ID is required" })
          .uuid("Each product ID must be a valid UUID"),
        quantity: z
          .number({ error: "Quantity is required" })
          .int()
          .positive("Quantity must be a positive integer"),
      })
    )
    .nonempty("The order must contain at least one product."), 
});
