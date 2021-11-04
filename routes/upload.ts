import { Router } from "express";
import { check } from "express-validator";

import {uploadController} from '../controllers';
import {validarArchivoAll, validationCampAll} from '../middlewares';
import {validarCamposAll} from '../helpers';

// Extraccion de las importaciones
const {uploadFileFunction, updateImg, getImg, updateImgCloudinary} = uploadController;
const {validarArchivo} = validarArchivoAll;
const {validationCamp} = validationCampAll;
const {collectionsAllowed} = validarCamposAll;

const router: Router = Router();

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
router.put('/:collection/:id',[
    validarArchivo,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('collection').custom( c =>  collectionsAllowed(c, ['users', 'products'])),
    validationCamp
], updateImgCloudinary);

// Obtener imagen
router.get('/:collection/:id',[
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('collection').custom( c =>  collectionsAllowed(c, ['users', 'products'])),
    validationCamp
], getImg);


export default router;