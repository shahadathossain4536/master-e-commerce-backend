import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/api/products', ProductController.addProduct);
router.get('/api/products', ProductController.getAllProduct);
router.get('/api/products/:productId', ProductController.getSingleProduct);
router.delete('/api/products/:productId', ProductController.deleteProduct);
router.get('/api/products/?searchTerm', ProductController.deleteProduct);

export const ProductRouter = router;
