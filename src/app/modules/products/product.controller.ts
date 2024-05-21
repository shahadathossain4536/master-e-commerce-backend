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
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductDB();

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log('productId', productId);

    const result = await ProductService.getSingleProductDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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
const searchProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductService.searchProductDB(searchTerm as string);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error.message ||
        `Products matching search term '${searchTerm}' fetched successfully!`,
      error: error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProductDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Product id not found',
      error: error,
    });
  }
};

export const ProductController = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  searchProduct,
};
