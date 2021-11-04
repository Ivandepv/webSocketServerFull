"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
// Acabado ??????
const uploadFile = (files, validFormat = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameShort = file.name.split('.');
        const format = nameShort[nameShort.length - 1];
        // Exntesion obtenida
        if (!validFormat.includes(format)) {
            return reject(`La extension ${format} no es valida --- ${validFormat}`);
        }
        // Carpinteria
        const tempName = (0, uuid_1.v4)() + '.' + format;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', folder, tempName);
        file.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(tempName);
            }
        });
    });
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload-file-help.js.map