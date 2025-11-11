import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';

interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    productId: string,
    updateData: UpdateProductData
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findById(productId);

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = await this.productRepository.update(
      productId,
      updateData
    );

    return updatedProduct;
  }
}