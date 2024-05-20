import cors from 'cors';
import express, { Application } from 'express';
import { ProductRouter } from './app/modules/products/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', ProductRouter);
export default app;
