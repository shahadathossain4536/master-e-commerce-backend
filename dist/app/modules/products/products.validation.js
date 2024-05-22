"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialProductSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
const variantsSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative()
        .min(0, { message: 'Quantity must be a non-negative integer' }),
    inStock: zod_1.z.boolean(),
});
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(4, { message: 'Name is required' }),
    description: zod_1.z.string().min(50, { message: 'Description is required' }),
    price: zod_1.z
        .number()
        .nonnegative({ message: 'Price must be a non-negative number' }),
    category: zod_1.z.string().min(1, { message: 'Category is required' }),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantsSchema),
    inventory: inventorySchema,
});
exports.productSchema = productSchema;
const partialProductSchema = productSchema.partial();
exports.partialProductSchema = partialProductSchema;
