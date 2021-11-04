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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const models_1 = require("../models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../helpers");
// Sacar funciones de las importaciones
const { verifyEmail, verifyPassword } = helpers_1.validarRequestAll;
// TODO: Make requests
// Getting user
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from = 0, to = 5 } = req.query;
    const query = { estado: true };
    // optimizacion
    const [all, users] = yield Promise.all([
        models_1.User.countDocuments(query),
        models_1.User.find(query).skip(Number(from)).limit(Number(to))
    ]);
    res.json({ all, users });
});
exports.getUsers = getUsers;
// Getting an user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield models_1.User.findById(id);
    res.json(user);
});
exports.getUser = getUser;
// Making an user
// Acabado???
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const user = new models_1.User({ name, email, password, role });
    // Encriptacion
    const salt = bcryptjs_1.default.genSaltSync();
    user.password = bcryptjs_1.default.hashSync(password.toString(), salt);
    // Guardado
    yield user.save();
    res.json(user);
});
exports.postUser = postUser;
// Update User
// Validar nombre si viene
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { __v, google, _id, password } = _a, resto = __rest(_a, ["__v", "google", "_id", "password"]);
    let respEmail = true;
    let respPassword = true;
    const data = resto;
    if (resto.email) {
        respEmail = verifyEmail(resto.email);
    }
    if (password) {
        respPassword = verifyPassword(password);
        const salt = bcryptjs_1.default.genSaltSync();
        data.password = bcryptjs_1.default.hashSync(password.toString(), salt);
    }
    // Validar emial and password
    if (!respEmail) {
        return res.status(400).json({ msg: 'El email no es valido, porfavor intente de nuevo' });
    }
    else if (!respPassword) {
        return res.status(400).json({ msg: 'El password no es valido, porfavor intente de nuevo' });
    }
    const user = yield models_1.User.findByIdAndUpdate(id, data, { new: true });
    res.json(user);
});
exports.putUser = putUser;
// Deleting User (without delete on db)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield models_1.User.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(user);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map