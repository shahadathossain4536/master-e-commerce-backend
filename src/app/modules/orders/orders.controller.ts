import { Request, Response } from 'express';
import orderSchema from './orders.validation';
import { orderService } from './orders.service';
import { Orders } from './orders.interface';

// Custom type guard to check if error has 'errors' property
function isError(error: unknown): error is { errors: unknown } {
  return typeof error === 'object' && error !== null && 'errors' in error;
}

const addOrder = async (req: Request, res: Response) => {
  const orderData: Orders = req.body;

  try {
    const validatedOrderData = orderSchema.parse(orderData);

    const result = await orderService.addOrderDB(validatedOrderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    console.error('Error creating order:', error);

    if (error instanceof Error) {
      if (error.message === 'Product does not exist') {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
      });
    } else if (isError(error)) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const orders = await orderService.getAllOrdersDB(
      email as string | undefined,
    );
    res.status(200).json({
      success: true,
      message: email
        ? `Orders fetched successfully for user email!`
        : 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const OrderController = {
  addOrder,
  getAllOrders,
};
