import { Response,Request } from 'express';
import { CreateProductUseCase } from '../../domain/usecases/product/create-product.usecase';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { UpdateProductUseCase } from '../../domain/usecases/product/update-product.usecase';
import { GetProductsUseCase } from '../../domain/usecases/product/get-products.usecase';
import { AuthRequest } from '../middlewares/auth.middleware'; // Import  custom request type(the one with user info added)

// Instantiate repository and use case
const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const getProductsUseCase= new GetProductsUseCase(productRepository);

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

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProduct = await updateProductUseCase.execute(id, updateData);

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      object: updatedProduct,
      errors: null,
    });
  } catch (error) {
    if ((error as Error).message === 'Product not found') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        object: null,
        errors: [(error as Error).message],
      });
    }

    
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      object: null,
      errors: [(error as Error).message],
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
  
    const page = req.query.page ? Number(req.query.page) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
     const search = req.query.search as string | undefined;

    const paginatedResult = await getProductsUseCase.execute(page, pageSize, search);

    return res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      ...paginatedResult,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve products',
      errors: [(error as Error).message],
    });
  }
};