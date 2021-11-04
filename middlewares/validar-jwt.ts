import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const validarJWT = async(req: Request, res: Response, next: NextFunction) =>{
    const token: string | undefined = req.header('x-token');
    
    if(!token){
        return res.status(401).json({msg: 'No hay token en la peticion'});
    }

    const secretKey: string | undefined = process.env.SECRETORPRIVATEKEY;

    try {
        // Verify jwt
        const resp = jwt.verify(token, secretKey as string);
        const {uid} = resp as jwt.JwtPayload
    
        // Find user and validate
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({msg: "The user doesn't exists in db"});
        }

        if(!user.estado){
            return res.status(401).json({msg: "The user doesn't exists"});
        }
        
        // No se donde guardar, pero ira en body por mientras, ya que typescript no permite crear un nuevo objeto en request.
        req.body = {...req.body, user};  

        next();

    } catch (error) {
       res.status(401).json({msg: 'token no valido'});
    }
    
}
