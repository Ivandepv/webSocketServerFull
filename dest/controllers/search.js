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
exports.buscar = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
// Colecciones permitidas, son los modelos que hay.
const collections = {
    categories: 'categories',
    products: 'products',
    users: 'users'
};
// User
const searchUsers = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esmongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esmongoId) {
        const user = yield models_1.User.findById(termino);
        return res.json({
            results: (user) ? user : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const users = yield models_1.User.find({ name: regex, estado: true });
    res.json({
        results: users
    });
});
// Category
const searchCategories = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esmongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esmongoId) {
        const category = yield models_1.Category.findById(termino);
        return res.json({
            results: (category) ? category : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const categories = yield models_1.Category.find({ name: regex, estado: true });
    res.json({
        results: categories
    });
});
// Product
const searchProducts = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esmongoId = (0, mongoose_1.isValidObjectId)(termino);
    if (esmongoId) {
        const product = yield models_1.Product.findById(termino);
        return res.json({
            results: (product) ? product : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const products = yield models_1.Product.find({ name: regex, estado: true });
    res.json({
        results: products
    });
});
// switch para ver que coleccion es
const buscar = (req, res) => {
    const { collection, term } = req.params;
    // Verificar si se encuentra la coleccion
    if (!Object.keys(collections).includes(collection)) {
        return res.status(400).json({
            msg: `colecciones permitidas [ ${Object.keys(collections)} ]`
        });
    }
    switch (collection) {
        case collections.categories:
            searchCategories(term, res);
            break;
        case collections.products:
            searchProducts(term, res);
            break;
        case collections.users:
            searchUsers(term, res);
            break;
        default:
            res.status(500).json({
                msg: 'avisar al administrador u encargado de hacer el back end'
            });
    }
};
exports.buscar = buscar;
//# sourceMappingURL=search.js.map