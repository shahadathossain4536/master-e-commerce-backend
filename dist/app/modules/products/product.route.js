"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/api/products', product_controller_1.ProductController.addProduct);
router.get('/api/products', product_controller_1.ProductController.getAllProduct);
router.get('/api/products/:productId', product_controller_1.ProductController.getSingleProduct);
router.delete('/api/products/:productId', product_controller_1.ProductController.deleteProduct);
router.put('/api/products/:productId', product_controller_1.ProductController.updateProduct);
exports.ProductRouter = router;
