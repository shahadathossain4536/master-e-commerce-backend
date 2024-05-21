import mongoose, { Schema } from 'mongoose';
import { Orders } from './orders.interface';

const orderSchema = new Schema<Orders>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderModel = mongoose.model<Orders>('Order', orderSchema);

export default OrderModel;
