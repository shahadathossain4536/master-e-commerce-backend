"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const orders_validation_1 = __importDefault(require("./orders.validation"));
const orders_service_1 = require("./orders.service");
// Custom type guard to check if error has 'errors' property
function isValidationError(error) {
    return typeof error === 'object' && error !== null && 'errors' in error;
}
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    try {
        const validatedOrderData = orders_validation_1.default.parse(orderData);
        const result = yield orders_service_1.orderService.addOrderDB(validatedOrderData);
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
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
        }
        else if (isValidationError(error)) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
});
exports.OrderController = {
    addOrder,
};
