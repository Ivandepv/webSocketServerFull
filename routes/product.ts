// Importaciones
import { Router } from "express";
import { check } from 'express-validator';
import {productsController} from '../controllers';
import {validarCamposAll} from '../helpers';
import {validarJWTAll, validationCampAll, validarRolesAll} from '../middlewares'

 
// extraer funciones de las importaciones
const {getProducts, getProduct, postProduct, putProduct, deleteProduct} = productsController
// Middlewares
const {validarJWT}      = validarJWTAll;
const {tieneRole}       = validarRolesAll;
const {validationCamp}  = validationCampAll
// Helpers
const {productExistById, productDeleted, categoryExistById} = validarCamposAll;

//TODO: HACER LAS RUTAS Y CONTROLADORES
const router = Router();

router.get('/', getProducts);

router.get('/:id',[
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(productExistById),
    validationCamp
], getProduct);

router.post('/',[
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre tiene que ser mayor a 2 letras y menor a 40 letras').isLength({min: 2, max: 40}),
    check('category', 'Debe ser un id de mongo').isMongoId(),
    check('category').custom(categoryExistById),
    validationCamp
], postProduct);

router.put('/:id',[
    validarJWT,
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(productExistById),
    validationCamp
], putProduct);

router.delete('/:id',[
    validarJWT,
    check('id', 'Debe ser un id de mongo').isMongoId(),
    check('id').custom(productExistById),
    check('id').custom(productDeleted),
    tieneRole('ADMIN_ROLE', "SUPERVISION_ROLE"),
    validationCamp
], deleteProduct);

export default router;