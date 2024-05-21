import { Request, Response } from 'express';
import orderSchema from './orders.validation';
import { orderService } from './orders.service';
import { Orders } from './orders.interface';

const addOrder = async (req: Request, res: Response) => {
  const orderData: Orders = req.body;

  try {
    // Validate request body using Zod schema
    const validatedOrderData = orderSchema.parse(orderData);

    // Create the order in the database via the service
    const result = await orderService.addOrderDB(validatedOrderData);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error('Error creating order:', error);

    if (error.message === 'Product does not exist') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (error.errors) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

export const OrderController = {
  addOrder,
};
