import { Product } from '@prisma/client';
import { ProductRepository } from '../../repositories/product.repository';


interface PaginatedProductResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalProducts: number;
  products: Product[];
}

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    page: number,
    pageSize: number
  ): Promise<PaginatedProductResponse> {
    const { products, totalCount } =
      await this.productRepository.findAllPaginated(page, pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      currentPage: page,
      pageSize: products.length,
      totalPages: totalPages,
      totalProducts: totalCount,
      products: products,
    };
  }
}