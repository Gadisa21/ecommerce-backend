import { Order } from '@prisma/client';
import { OrderRepository } from '../../repositories/order.repository';

interface OrderItem {
  productId: string;
  quantity: number;
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string, items: OrderItem[]): Promise<Order> {
    
    return this.orderRepository.create(userId, items);
  }
}