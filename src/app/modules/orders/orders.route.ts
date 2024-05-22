import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

router.post('/api/orders', OrderController.addOrder);
router.get('/api/orders', OrderController.getAllOrders);

export const OrdersRouter = router;
