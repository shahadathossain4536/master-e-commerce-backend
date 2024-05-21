import ProductModel from './product.model';
import { Product } from './products.interface';
import mongoose from 'mongoose';
const addProductDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductDB = async () => {
  const result = await ProductModel.find();
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
const searchProductDB = async (searchTerm: string) => {
  const result = await ProductModel.find({ name: searchTerm });
  return result;
};
export const ProductService = {
  addProductDB,
  getAllProductDB,
  getSingleProductDB,
  deleteProductDB,
  searchProductDB,
};
