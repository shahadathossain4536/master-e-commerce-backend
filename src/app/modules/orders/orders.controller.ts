import { Request, Response } from 'express';
import orderSchema from './orders.validation';
import { orderService } from './orders.service';
import { Orders } from './orders.interface';

// Custom type guard to check if error has 'errors' property
function isValidationError(error: unknown): error is { errors: unknown } {
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
    } else if (isValidationError(error)) {
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
export const OrderController = {
  addOrder,
};
