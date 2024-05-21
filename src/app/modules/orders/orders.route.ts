import express from 'express';
import { OrderController } from './orders.controller';

const router = express.Router();

router.post('/api/orders', OrderController.addOrder);

export const OrdersRouter = router;
