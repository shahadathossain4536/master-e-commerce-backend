import mongoose, { Schema } from 'mongoose';
import { Inventory, Product, Variants } from './products.interface';

const variantsSchema = new Schema<Variants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
