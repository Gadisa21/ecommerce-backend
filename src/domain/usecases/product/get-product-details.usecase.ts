import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';

export class GetProductDetailsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}