"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
// Sacar funciones de las importaciones
const { googleSignIn, login, renewToken } = controllers_1.authController;
const { validationCamp } = middlewares_1.validationCampAll;
const { validarJWT } = middlewares_1.validarJWTAll;
// Router
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'el email debe ser valido').isEmail(),
    (0, express_validator_1.check)('password', 'la contrasena no es valida').not().isEmpty(),
    validationCamp
], login);
router.post('/google', [
    (0, express_validator_1.check)('id_token', 'id_Token es necesario').not().isEmpty(),
    validationCamp
], googleSignIn);
router.get('/', validarJWT, renewToken);
exports.default = router;
//# sourceMappingURL=auth.js.map