import ProductModel from './product.model';

import mongoose from 'mongoose';
import { TProduct } from './products.interface';

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

export const ProductService = {
  addProductDB,
  getAllProductDB,
  getSingleProductDB,
  deleteProductDB,
};
