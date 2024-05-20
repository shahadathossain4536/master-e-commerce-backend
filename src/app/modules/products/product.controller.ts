import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productSchema from './products.validation';

const addProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const validationResult = productSchema.parse(product);
    const result = await ProductService.addProductDB(validationResult);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      error: error,
    });
  }
};

export const ProductController = {
  addProduct,
};
