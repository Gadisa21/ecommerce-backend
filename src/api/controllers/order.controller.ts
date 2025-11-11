import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderUseCase } from '../../domain/usecases/order/create-order.usecase';
import { GetOrderHistoryUseCase } from '../../domain/usecases/order/get-order-history.usecase';

const orderRepository = new OrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getOrderHistoryUseCase = new GetOrderHistoryUseCase(orderRepository);

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const items = req.body;

    const newOrder = await createOrderUseCase.execute(userId, items);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      object: newOrder,
      errors: null,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;

    // specific error types from the repository
    if (errorMessage.includes('Insufficient stock')) {
      return res.status(400).json({
        success: false,
        message: 'Order could not be placed',
        errors: [errorMessage],
      });
    }

    if (errorMessage.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'Order could not be placed',
        errors: [errorMessage],
      });
    }

    // Handle any other unexpected errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to place order',
      errors: [errorMessage],
    });
  }
};


export const getOrderHistory = async (req: AuthRequest, res: Response) => {
  try {
   
    const userId = req.user!.userId;

    const orders = await getOrderHistoryUseCase.execute(userId);

    return res.status(200).json({
      success: true,
      message: 'Order history retrieved successfully',
      object: orders,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve order history',
      errors: [(error as Error).message],
    });
  }
};