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
exports.orderService = void 0;
const product_model_1 = __importDefault(require("../products/product.model"));
const orders_model_1 = __importDefault(require("./orders.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const checkProductExists = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    return !!product;
});
const updateProductQuantity = (productId, orderedQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        if (orderedQuantity > product.inventory.quantity) {
            throw new Error('Insufficient quantity available in inventory');
        }
        const updatedQuantity = product.inventory.quantity - orderedQuantity;
        // Update inventory quantity and set inStock based on the updated quantity
        yield product_model_1.default.findByIdAndUpdate(productId, {
            $set: {
                'inventory.quantity': updatedQuantity,
                'inventory.inStock': updatedQuantity > 0 ? true : false,
            },
        });
    }
    catch (error) {
        console.error('Error updating product quantity:', error);
        throw error;
    }
});
const addOrderDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = orderData;
    if (!mongoose_1.default.isValidObjectId(productId)) {
        throw new Error('Invalid productId');
    }
    const productExists = yield checkProductExists(productId);
    if (!productExists) {
        throw new Error('Product does not exist');
    }
    yield updateProductQuantity(productId, quantity);
    const order = new orders_model_1.default(orderData);
    const result = yield order.save();
    return result;
});
const getAllOrdersDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (email) {
        const regex = new RegExp(email, 'i');
        query = {
            $or: [{ email: regex }],
        };
    }
    const orders = yield orders_model_1.default.find(query);
    return orders;
});
exports.orderService = {
    addOrderDB,
    getAllOrdersDB,
};
