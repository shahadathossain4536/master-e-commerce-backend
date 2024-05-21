import { Request, Response } from 'express';
import orderSchema from './orders.validation';
import { orderService } from './orders.service';

const addOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const productId = order.productId;
    // const orderIdExist =

    const validationOrder = orderSchema.parse(order);
    const result = await orderService.addOrderDB(validationOrder);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      error: error,
    });
  }
};

export const OrderController = {
  addOrder,
};
