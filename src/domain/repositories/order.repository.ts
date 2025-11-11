import prisma from "../../utils/prisma";
import { Order, Prisma } from "@prisma/client";

// Define a type for the items in an order request
interface OrderItem {
  productId: string;
  quantity: number;
}

export class OrderRepository {
  async create(userId: string, items: OrderItem[]): Promise<Order> {
    return prisma.$transaction(async (tx) => {
      //
      const productIds = items.map((item) => item.productId);

      const productsFromDb = await tx.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (productsFromDb.length !== productIds.length) {
        throw new Error("One or more products not found");
      }

      let totalPrice = 0;
      const productSnapshots = [];

      for (const item of items) {
        const product = productsFromDb.find((p) => p.id === item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
        totalPrice += product.price * item.quantity;
        productSnapshots.push({
          productId: product.id,
          name: product.name,
          priceAtPurchase: product.price,
          quantity: item.quantity,
        });
      }

      await Promise.all(
        items.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })
        )
      );

      const newOrder = await tx.order.create({
        data: {
          user: { connect: { id: userId } },
          totalPrice,
          products: productSnapshots,
          status: "PENDING",
        },
      });

      return newOrder;
    });
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: {
        userId: userId, 
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
