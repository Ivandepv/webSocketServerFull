// Importaciones
import { Router } from "express";
import { check } from 'express-validator';
import { usersController } from '../controllers';
import { dbValidatorsAll, validarCamposAll } from "../helpers";
import { validarJWTAll, validarRolesAll, validationCampAll } from '../middlewares';;

// Sacar funciones de las importaciones
// Middlewares
const {validarJWT}      = validarJWTAll;
const {tieneRole}       = validarRolesAll;
const {validationCamp}  = validationCampAll
// Cotrollers
const {getUsers, getUser, postUser, putUser, deleteUser} = usersController;
// Helpers
const {esRoleValido} = dbValidatorsAll;
const {emailExist, userExist, userExistEstado} = validarCamposAll


// Router
const router:Router = Router();


router.get('/', getUsers);

router.get('/:id', [
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(userExist),
    validationCamp
], getUser);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').isLength({min: 2, max: 40}),
    check('password', 'El password debe de tener minimo 6 letras').isLength({min: 6, max: 40}),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailExist),
    validationCamp
], postUser);

// Validar jwt
router.put('/:id', [
    validarJWT,
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(userExist),
    check('email').custom(emailExist),
    check('role').custom(esRoleValido),
    validationCamp
], putUser);

// Validar rol y JWT
router.delete('/:id', [
    validarJWT,
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(userExistEstado),
    tieneRole('ADMIN_ROLE', "SUPERVISION_ROLE"),
    validationCamp
], deleteUser);


export default router;