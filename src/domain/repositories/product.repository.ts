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
    pageSize: number,
    searchTerm?: string
  ): Promise<{ products: Product[]; totalCount: number }> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const whereClause: Prisma.ProductWhereInput = searchTerm
      ? {
          name: {
            contains: searchTerm, 
            mode: 'insensitive', 
          },
        }
      : {};

    
    const [totalCount, products] = await prisma.$transaction([
      prisma.product.count({
        where: whereClause,
      }),
      prisma.product.findMany({
        skip: skip,
        take: take,
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { products, totalCount };
  }

}
