import { Response } from 'express';
import { CreateProductUseCase } from '../../domain/usecases/product/create-product.usecase';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { AuthRequest } from '../middlewares/auth.middleware'; // Import  custom request type(the one with user info added)

// Instantiate repository and use case
const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const adminUserId = req.user!.userId;

    const productData = {
      ...req.body,
      userId: adminUserId, 
    };

    const newProduct = await createProductUseCase.execute(productData);

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      object: newProduct,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      object: null,
      errors: [(error as Error).message],
    });
  }
};