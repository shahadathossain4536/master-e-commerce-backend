import ProductModel from '../products/product.model';
import { Orders } from './orders.interface';
import OrderModel from './orders.model';
import mongoose from 'mongoose';

const checkProductExists = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  return !!product;
};

const updateProductQuantity = async (
  productId: string,
  orderedQuantity: number,
) => {
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (orderedQuantity > product.inventory.quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }

    await ProductModel.findByIdAndUpdate(productId, {
      $inc: { 'inventory.quantity': -orderedQuantity },
    });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    throw error;
  }
};

const addOrderDB = async (orderData: Orders) => {
  const { productId, quantity } = orderData;

  if (!mongoose.isValidObjectId(productId)) {
    throw new Error('Invalid productId');
  }

  const productExists = await checkProductExists(productId);
  if (!productExists) {
    throw new Error('Product does not exist');
  }

  await updateProductQuantity(productId, quantity);

  const order = new OrderModel(orderData);
  const result = await order.save();
  return result;
};
const getAllOrdersDB = async (email?: string) => {
  let query = {};

  if (email) {
    const regex = new RegExp(email, 'i');
    query = {
      $or: [{ email: regex }],
    };
  }
  const orders = await OrderModel.find(query);
  return orders;
};
export const orderService = {
  addOrderDB,
  getAllOrdersDB,
};
