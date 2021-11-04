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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.putProduct = exports.postProduct = exports.getProduct = exports.getProducts = void 0;
const models_1 = require("../models");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    const query = { estado: true };
    const [all, products] = yield Promise.all([
        models_1.Product.countDocuments(query),
        models_1.Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name').skip(Number(from)).limit(Number(to))
    ]);
    res.json({ all, products });
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield models_1.Product.findById(id).populate('user', 'name').populate('category', 'name');
    res.json(product);
});
exports.getProduct = getProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { name, estado, user } = _a, body = __rest(_a, ["name", "estado", "user"]);
    // Verificar si existe
    const productDB = yield models_1.Product.findOne({ name: name.toUpperCase() });
    if (productDB && productDB.estado === true) {
        return res.status(400).json({
            msg: `El producto ${productDB.name} ya existe`
        });
    }
    // Generar data y crear
    const data = Object.assign(Object.assign({ name: name.toUpperCase() }, body), { user: req.body.user.id });
    const product = new models_1.Product(data);
    // Guardado
    yield product.save();
    res.json(product);
});
exports.postProduct = postProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { name, estado, user, __v } = _b, body = __rest(_b, ["name", "estado", "user", "__v"]);
    if (typeof estado !== 'boolean' && estado !== undefined) {
        return res.status(400).json({
            msg: 'El estado debe ser un boolean'
        });
    }
    // Verificar si viene nombre pasarloa a mayusculas porque si no, da error
    let nameProcesado = name;
    if (name) {
        nameProcesado = name.toUpperCase();
    }
    // Optimizar esto en post tambien se utiliza.
    const productDB = yield models_1.Product.findOne({ name: nameProcesado });
    if (productDB && productDB.estado === true) {
        return res.status(400).json({
            msg: `ya hay un producto llamado ${name}`
        });
    }
    // Generar data a guardar
    const data = Object.assign(Object.assign({ name: nameProcesado }, body), { estado, user: req.body.user.id });
    const product = yield models_1.Product.findByIdAndUpdate(id, data, { new: true });
    res.json(product);
});
exports.putProduct = putProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield models_1.Product.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(product);
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map