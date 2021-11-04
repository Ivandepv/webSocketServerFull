"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
// Extraccion de las importaciones
const { uploadFileFunction, updateImg, getImg, updateImgCloudinary } = controllers_1.uploadController;
const { validarArchivo } = middlewares_1.validarArchivoAll;
const { validationCamp } = middlewares_1.validationCampAll;
const { collectionsAllowed } = helpers_1.validarCamposAll;
const router = (0, express_1.Router)();
// Subir local
router.post('/', uploadFileFunction);
// // actualizar imagen a un objeto local
// router.put('/:collection/:id',[
//     validarArchivo,
//     check('id', 'El id debe ser un id de mongo').isMongoId(),
//     check('collection').custom( c =>  collectionsAllowed(c, ['users', 'products'])),
//     validationCamp
// ], updateImg);
// actualizar imagen a un objeto en la nube
router.put('/:collection/:id', [
    validarArchivo,
    (0, express_validator_1.check)('id', 'El id debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validationCamp
], updateImgCloudinary);
// Obtener imagen
router.get('/:collection/:id', [
    (0, express_validator_1.check)('id', 'El id debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validationCamp
], getImg);
exports.default = router;
//# sourceMappingURL=upload.js.map