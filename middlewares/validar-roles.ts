import { NextFunction, Request, Response } from "express";

// TIENE ROLE
export const tieneRole = (...roles: string[])=>{
    return (req: Request, res: Response, next: NextFunction) =>{
      if(!req.body.user){
        return res.status(500).json({
          msg: 'se quiere verificar el role sin validar el token primero'
        });
      }
  
      if(!roles.includes(req.body.user.role)){
        return res.status(401).json({
          msg: `El servicio requiere uno de estos roles ${roles}`
        })
      }
  
      next()
    }
  }