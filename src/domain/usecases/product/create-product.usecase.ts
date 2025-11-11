import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';

// Define a type for the input data to be more explicit
interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: string; // The ID of the admin creating the product
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(data: CreateProductData): Promise<Product> {
    const { name, description, price, stock, category, userId } = data;

    // The data is already validated by the middleware, so we can proceed to create
    const newProduct = await this.productRepository.create({
      name,
      description,
      price,
      stock,
      category,
      // Connect the product to the user (admin) who created it
      user: {
        connect: { id: userId },
      },
    });

    return newProduct;
  }
}