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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la peticion' });
    }
    const secretKey = process.env.SECRETORPRIVATEKEY;
    try {
        // Verify jwt
        const resp = jsonwebtoken_1.default.verify(token, secretKey);
        const { uid } = resp;
        // Find user and validate
        const user = yield user_1.default.findById(uid);
        if (!user) {
            return res.status(401).json({ msg: "The user doesn't exists in db" });
        }
        if (!user.estado) {
            return res.status(401).json({ msg: "The user doesn't exists" });
        }
        // No se donde guardar, pero ira en body por mientras, ya que typescript no permite crear un nuevo objeto en request.
        req.body = Object.assign(Object.assign({}, req.body), { user });
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'token no valido' });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map