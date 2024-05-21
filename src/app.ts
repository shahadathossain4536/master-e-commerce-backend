import cors from 'cors';
import express, { Application } from 'express';
import { ProductRouter } from './app/modules/products/product.route';
import { OrdersRouter } from './app/modules/orders/orders.route';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/v1', ProductRouter);
app.use('/v1', OrdersRouter);
export default app;
