import ProductModel from './product.model';

import mongoose from 'mongoose';
import { TProduct } from './products.interface';
import { partialProductSchema } from './products.validation';

const addProductDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductDB = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i'); // 'i' for case insensitive search
    query = {
      $or: [{ name: regex }, { description: regex }],
    };
  }

  const result = await ProductModel.find(query);
  return result;
};
const getSingleProductDB = async (productId: string) => {
  const objectId = new mongoose.Types.ObjectId(productId);
  const result = await ProductModel.findOne({ _id: objectId });
  return result;
};
const deleteProductDB = async (productId: string) => {
  const objectId = new mongoose.Types.ObjectId(productId);
  const result = await ProductModel.deleteOne({ _id: objectId });
  return result;
};
const updateProductDB = async (
  productId: string,
  productData: Partial<typeof partialProductSchema._type>,
) => {
  const validatedProductData = partialProductSchema.parse(productData);

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    { $set: validatedProductData },
    { new: true, runValidators: true },
  );

  return updatedProduct;
};
export const ProductService = {
  addProductDB,
  getAllProductDB,
  getSingleProductDB,
  deleteProductDB,
  updateProductDB,
};
