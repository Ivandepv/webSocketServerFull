// Importaciones
import { Router } from "express";
import { check } from 'express-validator';
import { categoriesController } from "../controllers";
import {validarCamposAll} from '../helpers';
import {validarJWTAll, validationCampAll, validarRolesAll} from '../middlewares'


// Funciones de las importaciones
const {deleteCategory, getCategories, getCategory, postCategory, putCategory} = categoriesController
// Middlewares
const {validarJWT}      = validarJWTAll;
const {tieneRole}       = validarRolesAll;
const {validationCamp}  = validationCampAll
// Helpers
const {categoryExistById, categoryDeleted} = validarCamposAll;

//TODO: HACER LAS RUTAS Y CONTROLADORES
const router = Router();

router.get('/', getCategories);

router.get('/:id',[
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(categoryExistById),
    validationCamp
], getCategory);

router.post('/',[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre tiene que ser mayor a 2 letras y menor a 40 letras').isLength({min: 2, max: 40}),
    validationCamp
] ,postCategory);

router.put('/:id',[
    validarJWT,
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(categoryExistById),
    validationCamp
], putCategory);

router.delete('/:id',[
    validarJWT,
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(categoryExistById),
    check('id').custom(categoryDeleted),
    tieneRole('ADMIN_ROLE', "SUPERVISION_ROLE"),
    validationCamp
], deleteCategory);

export default router;