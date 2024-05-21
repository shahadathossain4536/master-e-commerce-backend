import { Orders } from './orders.interface';
import OrderModel from './orders.model';

const addOrderDB = async (order: Orders) => {
  const result = await OrderModel.create(order);
  return result;
};

export const orderService = {
  addOrderDB,
};
