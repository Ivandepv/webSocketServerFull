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
exports.renewToken = exports.googleSignIn = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helpers_1 = require("../helpers");
// Sacar funciones de las importaciones
const { generarJWT } = helpers_1.generarJWTAll;
const { googleVerify } = helpers_1.googleVerifyAll;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        // Que exista
        if (!user) {
            return res.status(400).json({ msg: 'El email o password estan mal - email' });
        }
        // Estado en false
        if (!user.estado) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        // Password
        const validPassword = bcryptjs_1.default.compareSync(password.toString(), user.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'El email o password estan mal - password' });
        }
        // Generar el jwt
        const token = yield generarJWT(user.id);
        res.json({ token });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Hable con el administrador' });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { name, email, picture } = yield googleVerify(id_token);
        let usuario = yield user_1.default.findOne({ email });
        if (!usuario) {
            const data = {
                name,
                email,
                password: ':P',
                google: true,
                img: picture
            };
            usuario = new user_1.default(data);
            yield usuario.save();
        }
        // si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'
            });
        }
        // Generar el jwt
        const token = yield generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'el token no es valido'
        });
    }
});
exports.googleSignIn = googleSignIn;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const token = yield generarJWT(user.id);
    res.json({ user, token });
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map