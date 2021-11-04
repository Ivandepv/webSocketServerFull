import path from 'path';
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();
import cloudinarybefore from 'cloudinary'
import { Request, Response } from "express";
import {uploadFileHelpAll} from '../helpers';
import { Product, User } from "../models";


// Importando interfaces
import {UserInterface} from '../models/user';
import { ProductInterface } from '../models/product';


// clodinary
const cloudinary = cloudinarybefore.v2
cloudinary.config(process.env.CLOUDINARY_URL as string);
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

// Extracciones
const {uploadFile} = uploadFileHelpAll;

export const uploadFileFunction = async(req: Request, res: Response)=>{
    try {
        // Se puede optimizar y en la request pedir que extensiones se quieren guardar
        const name = await uploadFile(req.files, ['docx', 'pdf'], 'imgs');

        res.json({name});

    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}


export const updateImg = async(req: Request, res: Response)=>{
    const {id, collection} = req.params;
    let modelo: (UserInterface | ProductInterface | null);
    switch(collection){
        case 'users':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`
                });
            }
            break;
        default:
            res.status(500).json({msg: 'se me olvido validar esta coleccion al actualizar imagen'});
    }

    if(modelo! === null){
        return;
    }
    if(modelo!.img){
        const pathImagen: string = path.join(__dirname, '../uploads/', collection, modelo!.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }
    // Atrapar el error de la promise probar en restServer porque no lo tenia
    try {
        const nombre = await uploadFile(req.files, undefined, collection);

        modelo!.img = nombre;

        await (modelo! as any).save();

        res.json(modelo!);
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
    
}

export const updateImgCloudinary = async(req: Request | any, res: Response)=>{
    const {id, collection} = req.params;
    let modelo: (UserInterface | ProductInterface | null);
    switch(collection){
        case 'users':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`
                });
            }
            break;
        default:
            res.status(500).json({msg: 'se me olvido validar esta coleccion al actualizar imagen'});
    }

    if(modelo! === null){
        return;
    }

    if(modelo!.img){
        const arrayName: string[] = modelo!.img.split('/');
        const name = arrayName[arrayName.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy( `restfulServerCompleted/${public_id}` )
    }

    const {tempFilePath} = req.files.file;

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {folder:"restfulServerCompleted"});

    modelo!.img = secure_url;

    await (modelo! as any).save();

    res.json(modelo!);

}


export const getImg = async(req: Request, res: Response)=>{
    const {id, collection} = req.params;
    let modelo: (UserInterface | ProductInterface | null);
    switch(collection){
        case 'users':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `El usuario con el id ${id} no existe`
                });
            }
            break;
        case 'products':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `El producto con el id ${id} no existe`
                });
            }
            break;
        default:
            res.status(500).json({msg: 'se me olvido validar esta coleccion al actualizar imagen'});
    }

    console.log(modelo!.img);
    
    if(modelo!.img){
        const pathImagen: string = path.join(__dirname, '../uploads/', collection, modelo!.img);
        if(fs.existsSync(pathImagen)){
            console.log(modelo!.img);
            return res.sendFile(pathImagen);
        }
    }
  
    const pathImg:string = path.join(__dirname,'../assets/no-image.jpg');

    res.sendFile(pathImg)
}
