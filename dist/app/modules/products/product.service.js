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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const products_validation_1 = require("./products.validation");
const addProductDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(product);
    return result;
});
const getAllProductDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // 'i' for case insensitive search
        query = {
            $or: [{ name: regex }, { description: regex }],
        };
    }
    const result = yield product_model_1.default.find(query);
    return result;
});
const getSingleProductDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(productId);
    const result = yield product_model_1.default.findOne({ _id: objectId });
    return result;
});
const deleteProductDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(productId);
    const result = yield product_model_1.default.deleteOne({ _id: objectId });
    return result;
});
const updateProductDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedProductData = products_validation_1.partialProductSchema.parse(productData);
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, { $set: validatedProductData }, { new: true, runValidators: true });
    return updatedProduct;
});
exports.ProductService = {
    addProductDB,
    getAllProductDB,
    getSingleProductDB,
    deleteProductDB,
    updateProductDB,
};
