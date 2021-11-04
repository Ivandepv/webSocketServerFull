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
exports.deleteCategory = exports.putCategory = exports.postCategory = exports.getCategory = exports.getCategories = void 0;
const models_1 = require("../models");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    const query = { estado: true };
    const [all, categories] = yield Promise.all([
        models_1.Category.countDocuments(query),
        models_1.Category.find(query).populate('user', 'name').skip(Number(from)).limit(Number(to))
    ]);
    res.json({ all, categories });
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield models_1.Category.findById(id).populate('user', 'name');
    res.json(category);
});
exports.getCategory = getCategory;
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    // Verificar si existe
    const categoryDB = yield models_1.Category.findOne({ name: name.toUpperCase() });
    if (categoryDB && categoryDB.estado === true) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe`
        });
    }
    // Generar data y crear
    const data = {
        name: name.toUpperCase(),
        user: req.body.user.id
    };
    const category = new models_1.Category(data);
    // Guardado
    yield category.save();
    res.json(category);
});
exports.postCategory = postCategory;
const putCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, estado } = req.body;
    if (typeof estado !== 'boolean' && estado !== undefined) {
        return res.status(400).json({
            msg: 'El estado debe ser un boolean'
        });
    }
    // Optimizar esto en post tambien se utiliza.
    const categoryDB = yield models_1.Category.findOne({ name: name.toUpperCase() });
    if (categoryDB && categoryDB.estado === true) {
        return res.status(400).json({
            msg: `ya hay una categoria llamada ${name}`
        });
    }
    const category = yield models_1.Category.findByIdAndUpdate(id, { name: name.toUpperCase(), estado }, { new: true });
    res.json(category);
});
exports.putCategory = putCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield models_1.Category.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(category);
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categories.js.map