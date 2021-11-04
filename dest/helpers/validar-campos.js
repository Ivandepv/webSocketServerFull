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
exports.collectionsAllowed = exports.productDeleted = exports.productExistById = exports.categoryDeleted = exports.categoryExistById = exports.esRoleValido = exports.emailExist = exports.userExistEstado = exports.userExist = void 0;
const models_1 = require("../models");
// Usuarios
const userExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(id);
    if (!user) {
        throw new Error(`el usuario con el id ${id} no existe`);
    }
});
exports.userExist = userExist;
const userExistEstado = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(id);
    if (!(user === null || user === void 0 ? void 0 : user.estado)) {
        throw new Error(`el usuario con el id ${id} no existe`);
    }
});
exports.userExistEstado = userExistEstado;
const emailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield models_1.User.findOne({ email });
    if (emailExists) {
        throw new Error('El Email ya esta en uso');
    }
});
exports.emailExist = emailExist;
const esRoleValido = (role = 'USER_ROLE') => __awaiter(void 0, void 0, void 0, function* () {
    const rol = yield models_1.Role.findOne({ role });
    if (!rol) {
        throw new Error(`No existe el rol ${role}`);
    }
});
exports.esRoleValido = esRoleValido;
// Category
const categoryExistById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield models_1.Category.findById(id);
    if (!category) {
        throw new Error(`la categoria por id ${id} no existe`);
    }
});
exports.categoryExistById = categoryExistById;
const categoryDeleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield models_1.Category.findById(id);
    if (!category.estado) {
        throw new Error(`El id: ${id} esta eliminado`);
    }
});
exports.categoryDeleted = categoryDeleted;
// Product
const productExistById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield models_1.Product.findById(id);
    if (!product) {
        throw new Error(`El id: ${id} no existe`);
    }
});
exports.productExistById = productExistById;
const productDeleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield models_1.Product.findById(id);
    if (!product.estado) {
        throw new Error(`El id: ${id} esta eliminado`);
    }
});
exports.productDeleted = productDeleted;
// Upload
const collectionsAllowed = (collection = '', collections = []) => {
    if (!collections.includes(collection)) {
        throw new Error(`La collection ${collection} no esta en las collections permitidas - ${collections}`);
    }
    return true;
};
exports.collectionsAllowed = collectionsAllowed;
//# sourceMappingURL=validar-campos.js.map