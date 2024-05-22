import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { partialProductSchema, productSchema } from './products.validation';
function isError(error: unknown): error is Error {
  return error instanceof Error;
}
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
  } catch (error: unknown) {
    console.error(error);

    if (isError(error)) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductService.getAllProductDB(
      searchTerm as string | undefined,
    );

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'All products fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    console.error(error);

    if (isError(error)) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductService.getSingleProductDB(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    // Use 'unknown' instead of 'any'
    console.error(error);

    let errorMessage = 'Product id not found';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
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
      data: result,
    });
  } catch (error: unknown) {
    console.error(error);

    if (isError(error)) {
      res.status(500).json({
        success: false,
        message: error.message || 'Product id not found',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productData = req.body;

  try {
    const validatedProductData = partialProductSchema.parse(productData);

    const updatedProduct = await ProductService.updateProductDB(
      productId,
      validatedProductData,
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedProduct,
    });
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};
export const ProductController = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
