import { Order } from "@prisma/client";
import { OrderRepository } from "../../repositories/order.repository";


export class GetOrderHistoryUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(userId: string): Promise<Order[]> {
    const orders = await this.orderRepository.findByUserId(userId);
    return orders;
  }
}
