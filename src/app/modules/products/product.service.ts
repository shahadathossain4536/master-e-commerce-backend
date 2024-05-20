import ProductModel from './product.model';
import { Product } from './products.interface';

const addProductDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

export const ProductService = {
  addProductDB,
};
