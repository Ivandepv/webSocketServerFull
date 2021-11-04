"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
// Funciones de las importaciones
const { deleteCategory, getCategories, getCategory, postCategory, putCategory } = controllers_1.categoriesController;
// Middlewares
const { validarJWT } = middlewares_1.validarJWTAll;
const { tieneRole } = middlewares_1.validarRolesAll;
const { validationCamp } = middlewares_1.validationCampAll;
// Helpers
const { categoryExistById, categoryDeleted } = helpers_1.validarCamposAll;
//TODO: HACER LAS RUTAS Y CONTROLADORES
const router = (0, express_1.Router)();
router.get('/', getCategories);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(categoryExistById),
    validationCamp
], getCategory);
router.post('/', [
    validarJWT,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('name', 'El nombre tiene que ser mayor a 2 letras y menor a 40 letras').isLength({ min: 2, max: 40 }),
    validationCamp
], postCategory);
router.put('/:id', [
    validarJWT,
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(categoryExistById),
    validationCamp
], putCategory);
router.delete('/:id', [
    validarJWT,
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(categoryExistById),
    (0, express_validator_1.check)('id').custom(categoryDeleted),
    tieneRole('ADMIN_ROLE', "SUPERVISION_ROLE"),
    validationCamp
], deleteCategory);
exports.default = router;
//# sourceMappingURL=category.js.map