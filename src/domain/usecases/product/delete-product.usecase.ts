import { ProductRepository } from '../../repositories/product.repository';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(productId);

    if (!existingProduct) {
      throw new Error('Product not found');
    }

   
    await this.productRepository.deleteById(productId);
  }
}