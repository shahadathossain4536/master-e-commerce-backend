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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const products_validation_1 = require("./products.validation");
function isError(error) {
    return error instanceof Error;
}
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const validationResult = products_validation_1.productSchema.parse(product);
        const result = yield product_service_1.ProductService.addProductDB(validationResult);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        if (isError(error)) {
            res.status(500).json({
                success: false,
                message: error.message || 'Internal server error',
                error: error,
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
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductService.getAllProductDB(searchTerm);
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        if (isError(error)) {
            res.status(500).json({
                success: false,
                message: error.message || 'Internal server error',
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        // Use 'unknown' instead of 'any'
        console.error(error);
        let errorMessage = 'Product id not found';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({
            success: false,
            message: errorMessage,
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.ProductService.deleteProductDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        if (isError(error)) {
            res.status(500).json({
                success: false,
                message: error.message || 'Product id not found',
                error: error,
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const productData = req.body;
    try {
        const validatedProductData = products_validation_1.partialProductSchema.parse(productData);
        const updatedProduct = yield product_service_1.ProductService.updateProductDB(productId, validatedProductData);
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct,
        });
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({
                success: false,
                message: error.message || 'Internal server error',
                error: error,
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
exports.ProductController = {
    addProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
};
