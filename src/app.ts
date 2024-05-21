import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRouter } from './app/modules/products/product.route';
import { OrdersRouter } from './app/modules/orders/orders.route';

const app: Application = express();

app.use(express.json());
app.use(cors());
// Middleware to handle not found routes

app.use('/v1', ProductRouter);
app.use('/v1', OrdersRouter);
const getAController = (req: Request, res: Response) => {
  res.send('Server Start');
};

app.get('/', getAController);
export default app;
