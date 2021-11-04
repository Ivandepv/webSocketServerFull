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
exports.getImg = exports.updateImgCloudinary = exports.updateImg = exports.uploadFileFunction = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = __importDefault(require("cloudinary"));
const helpers_1 = require("../helpers");
const models_1 = require("../models");
// clodinary
const cloudinary = cloudinary_1.default.v2;
cloudinary.config(process.env.CLOUDINARY_URL);
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });
// Extracciones
const { uploadFile } = helpers_1.uploadFileHelpAll;
const uploadFileFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Se puede optimizar y en la request pedir que extensiones se quieren guardar
        const name = yield uploadFile(req.files, ['docx', 'pdf'], 'imgs');
        res.json({ name });
    }
    catch (error) {
        res.status(400).json({
            msg: error
        });
    }
});
exports.uploadFileFunction = uploadFileFunction;
const updateImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let modelo;
    switch (collection) {
        case 'users':
            modelo = yield models_1.User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`
                });
            }
            break;
        case 'products':
            modelo = yield models_1.Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`
                });
            }
            break;
        default:
            res.status(500).json({ msg: 'se me olvido validar esta coleccion al actualizar imagen' });
    }
    if (modelo === null) {
        return;
    }
    if (modelo.img) {
        const pathImagen = path_1.default.join(__dirname, '../uploads/', collection, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            fs_1.default.unlinkSync(pathImagen);
        }
    }
    // Atrapar el error de la promise probar en restServer porque no lo tenia
    try {
        const nombre = yield uploadFile(req.files, undefined, collection);
        modelo.img = nombre;
        yield modelo.save();
        res.json(modelo);
    }
    catch (error) {
        res.status(400).json({
            msg: error
        });
    }
});
exports.updateImg = updateImg;
const updateImgCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let modelo;
    switch (collection) {
        case 'users':
            modelo = yield models_1.User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`
                });
            }
            break;
        case 'products':
            modelo = yield models_1.Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`
                });
            }
            break;
        default:
            res.status(500).json({ msg: 'se me olvido validar esta coleccion al actualizar imagen' });
    }
    if (modelo === null) {
        return;
    }
    if (modelo.img) {
        const arrayName = modelo.img.split('/');
        const name = arrayName[arrayName.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(`restfulServerCompleted/${public_id}`);
    }
    const { tempFilePath } = req.files.file;
    const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, { folder: "restfulServerCompleted" });
    modelo.img = secure_url;
    yield modelo.save();
    res.json(modelo);
});
exports.updateImgCloudinary = updateImgCloudinary;
const getImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection } = req.params;
    let modelo;
    switch (collection) {
        case 'users':
            modelo = yield models_1.User.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`
                });
            }
            break;
        case 'products':
            modelo = yield models_1.Product.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`
                });
            }
            break;
        default:
            res.status(500).json({ msg: 'se me olvido validar esta coleccion al actualizar imagen' });
    }
    console.log(modelo.img);
    if (modelo.img) {
        const pathImagen = path_1.default.join(__dirname, '../uploads/', collection, modelo.img);
        if (fs_1.default.existsSync(pathImagen)) {
            console.log(modelo.img);
            return res.sendFile(pathImagen);
        }
    }
    const pathImg = path_1.default.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);
});
exports.getImg = getImg;
//# sourceMappingURL=upload.js.map