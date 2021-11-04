import { Router } from "express";
import { check } from 'express-validator';
import { authController } from '../controllers';
import { validationCampAll, validarJWTAll } from '../middlewares';

// Sacar funciones de las importaciones
const {googleSignIn, login, renewToken} = authController;
const {validationCamp} = validationCampAll;
const {validarJWT} = validarJWTAll;

// Router
const router:Router = Router();

router.post('/login',[
    check('email', 'el email debe ser valido').isEmail(),
    check('password', 'la contrasena no es valida').not().isEmpty(),
    validationCamp
], login);


router.post('/google',[
    check('id_token', 'id_Token es necesario').not().isEmpty(),
    validationCamp
], googleSignIn);

router.get('/', validarJWT, renewToken);

export default router;