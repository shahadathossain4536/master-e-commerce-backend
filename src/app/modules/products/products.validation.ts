import { z } from 'zod';

const variantsSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const inventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative()
    .min(0, { message: 'Quantity must be a non-negative integer' }),
  inStock: z.boolean(),
});

const productSchema = z.object({
  name: z.string().min(4, { message: 'Name is required' }),
  description: z.string().min(50, { message: 'Description is required' }),
  price: z
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(z.string()),
  variants: z.array(variantsSchema),
  inventory: inventorySchema,
});

export default productSchema;
