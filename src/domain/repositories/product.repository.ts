import { Prisma, PrismaClient, Product } from "@prisma/client";
import prisma from "../../utils/prisma";

type ProductCreateInput = Prisma.ProductCreateInput;
type ProductUpdateInput =Prisma.ProductUpdateInput;


export class ProductRepository {

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async create(productData: ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data: productData });
  }

  async update(id: string, data: ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

   async findAllPaginated(
    page: number,
    pageSize: number
  ): Promise<{ products: Product[]; totalCount: number }> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    
    const [totalCount, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        skip: skip,
        take: take,
        orderBy: { createdAt: 'desc' } as any,
      }),
    ]);

    return { products, totalCount };
  }

}
