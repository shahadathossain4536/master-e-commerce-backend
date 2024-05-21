import { z } from 'zod';

// Define the Zod schema for Orders
const orderSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .nonempty({ message: 'Email is required' }),
  productId: z.string().nonempty({ message: 'Product ID is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
});

export default orderSchema;
