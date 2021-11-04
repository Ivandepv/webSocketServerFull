import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs from 'bcryptjs';
import { generarJWTAll, googleVerifyAll } from "../helpers";


// Sacar funciones de las importaciones
const {generarJWT} = generarJWTAll;
const {googleVerify} = googleVerifyAll;


export const login = async(req: Request, res: Response)=>{

    try{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    // Que exista
    if(!user){
        return res.status(400).json({msg: 'El email o password estan mal - email'});
    }
    // Estado en false
    if(!user.estado){
        return res.status(400).json({msg: 'El usuario no existe'});
    }
    // Password
    const validPassword = bcryptjs.compareSync(password.toString(), user.password);

    if(!validPassword){
        return res.status(400).json({msg: 'El email o password estan mal - password'});
    }

    // Generar el jwt
    const token = await generarJWT(user.id);

    res.json({token});

    } catch(e){
        console.log(e);
        res.status(500).json({msg:'Hable con el administrador'});
        
    }
}


export const googleSignIn = async(req: Request,res: Response)=>{

    const {id_token} = req.body;

    try {
        
        const {name, email, picture} = await googleVerify(id_token);
        
        let usuario = await User.findOne({email});

        if(!usuario){
            const data = {
                name,
                email,
                password: ':P',
                google: true,
                img: picture
            }

            usuario = new User(data);
            await usuario.save();
        }

        // si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'
            })
        }

         // Generar el jwt
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'el token no es valido'
        })
    }

    
}


export const renewToken = async(req: Request,res: Response)=>{
    const {user} = req.body;
    const token = await generarJWT(user.id);
    res.json({user, token})
}