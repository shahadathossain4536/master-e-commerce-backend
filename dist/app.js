"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/products/product.route");
const orders_route_1 = require("./app/modules/orders/orders.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Middleware to handle not found routes
app.use('/', product_route_1.ProductRouter);
app.use('/', orders_route_1.OrdersRouter);
app.get('/', (req, res) => {
    res.send('Server Start');
});
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
