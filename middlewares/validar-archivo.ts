import { NextFunction, Request, Response } from "express";

export const validarArchivo = (req: Request, res: Response, next: NextFunction)=>{


    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        return res.status(400).json({
            msg: 'No hay archivos en la peticion'
        })
    };

    next();
}