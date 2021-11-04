"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
// extraer funciones de las importaciones
const { getProducts, getProduct, postProduct, putProduct, deleteProduct } = controllers_1.productsController;
// Middlewares
const { validarJWT } = middlewares_1.validarJWTAll;
const { tieneRole } = middlewares_1.validarRolesAll;
const { validationCamp } = middlewares_1.validationCampAll;
// Helpers
const { productExistById, productDeleted, categoryExistById } = helpers_1.validarCamposAll;
//TODO: HACER LAS RUTAS Y CONTROLADORES
const router = (0, express_1.Router)();
router.get('/', getProducts);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(productExistById),
    validationCamp
], getProduct);
router.post('/', [
    validarJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('name', 'El nombre tiene que ser mayor a 2 letras y menor a 40 letras').isLength({ min: 2, max: 40 }),
    (0, express_validator_1.check)('category', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('category').custom(categoryExistById),
    validationCamp
], postProduct);
router.put('/:id', [
    validarJWT,
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(productExistById),
    validationCamp
], putProduct);
router.delete('/:id', [
    validarJWT,
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(productExistById),
    (0, express_validator_1.check)('id').custom(productDeleted),
    tieneRole('ADMIN_ROLE', "SUPERVISION_ROLE"),
    validationCamp
], deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map