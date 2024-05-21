import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct, TVariants } from './products.interface';

const variantsSchema = new Schema<TVariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

const ProductModel = mongoose.model<TProduct>('Product', productSchema);

export default ProductModel;
