import { Prisma, PrismaClient, Product } from "@prisma/client";
import prisma from "../../utils/prisma";

type ProductCreateInput = Prisma.ProductCreateInput;


export class ProductRepository {
  async create(productData: ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data: productData });
  }
}
