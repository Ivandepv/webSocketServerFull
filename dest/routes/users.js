"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importaciones
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
;
// Sacar funciones de las importaciones
// Middlewares
const { validarJWT } = middlewares_1.validarJWTAll;
const { tieneRole } = middlewares_1.validarRolesAll;
const { validationCamp } = middlewares_1.validationCampAll;
// Cotrollers
const { getUsers, getUser, postUser, putUser, deleteUser } = controllers_1.usersController;
// Helpers
const { esRoleValido } = helpers_1.dbValidatorsAll;
const { emailExist, userExist, userExistEstado } = helpers_1.validarCamposAll;
// Router
const router = (0, express_1.Router)();
router.get('/', getUsers);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(userExist),
    validationCamp
], getUser);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').isLength({ min: 2, max: 40 }),
    (0, express_validator_1.check)('password', 'El password debe de tener minimo 6 letras').isLength({ min: 6, max: 40 }),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('email').custom(emailExist),
    validationCamp
], postUser);
// Validar jwt
router.put('/:id', [
    validarJWT,
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(userExist),
    (0, express_validator_1.check)('email').custom(emailExist),
    (0, express_validator_1.check)('role').custom(esRoleValido),
    validationCamp
], putUser);
// Validar rol y JWT
router.delete('/:id', [
    validarJWT,
    (0, express_validator_1.check)('id', 'Debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('id').custom(userExistEstado),
    tieneRole('ADMIN_ROLE', "SUPERVISION_ROLE"),
    validationCamp
], deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map