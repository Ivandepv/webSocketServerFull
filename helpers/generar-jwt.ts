import jwt, { JwtPayload } from 'jsonwebtoken';

import {User} from '../models';

export const generarJWT = (uid:string)=>{
    return new Promise((resolve, reject) =>{
        
        const payload:{uid: string} = {uid};
        const secretKey: string | undefined = process.env.SECRETORPRIVATEKEY;

        jwt.sign(payload, secretKey as string, {
            expiresIn: '4h'
        }, (err: Error | null, token: string | undefined)=>{
            if(err){
                console.log(err);
                reject('no se pudo generar el token');
            }else{
                resolve(token);
            }
        });
 
    })
   
}

export const comprobarJWT = async(token:string = '')=>{
    try {
        if(token.length < 10){
            return null;
        }

        const resp = jwt.verify(token, (process.env.SECRETORPRIVATEKEY as string));
        const {uid} = resp as jwt.JwtPayload;

        const user = await User.findById(uid);

        if(user){
            if(user.estado){
                return user;
            }else{
                return null;
            }
        }else{
            return null;
        }
        
    } catch (error) {
        
        return null;
    }
}