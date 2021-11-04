import { Request, Response } from "express";
import {User} from "../models";
import bcryptjs from 'bcryptjs';
import { validarRequestAll } from "../helpers";

// Sacar funciones de las importaciones
const {verifyEmail, verifyPassword} = validarRequestAll;


export interface DataReq {
    name?:      string,
    estado?:    boolean,
    google?:    boolean,
    _id?:       string | number,
    password?:  string,
    email?:     string,
    role?:      string,
    __v?:       number
}

// TODO: Make requests

// Getting user
export const getUsers = async(req: Request, res: Response)=>{
    const { from = 0, to = 5} = req.query;
    const query: {estado: boolean} = {estado: true};

    // optimizacion
       const [ all, users ] = await Promise.all([
       User.countDocuments(query),
       User.find(query).skip(Number(from)).limit(Number(to))
    ])

    res.json({all,users});
}

// Getting an user
export const getUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    res.json(user);
}

// Making an user
// Acabado???
export const postUser = async(req: Request, res: Response)=>{

    const {name, email, password, role}: DataReq = req.body;
    const user = new User({name, email, password, role});

    // Encriptacion
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password!.toString(), salt);

    // Guardado
    await user.save();

    res.json(user);
}


// Update User
// Validar nombre si viene
export const putUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {__v, google, _id, password, ...resto } : DataReq = req.body;
    let respEmail: Boolean = true;
    let respPassword: Boolean = true;

    const data: DataReq = resto;

    
    if(resto.email){
        respEmail = verifyEmail(resto.email);
    }

    if(password){
        respPassword = verifyPassword(password);

        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password.toString(), salt);
    }

    // Validar emial and password
    if(!respEmail){
        return res.status(400).json({msg:'El email no es valido, porfavor intente de nuevo'});
    }else if(!respPassword){
        return res.status(400).json({msg:'El password no es valido, porfavor intente de nuevo'});
    }
    
    const user = await User.findByIdAndUpdate(id, data, { new:true });
    
    res.json(user);
}

// Deleting User (without delete on db)
export const deleteUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {estado:false}, {new: true});
    res.json(user);
}



