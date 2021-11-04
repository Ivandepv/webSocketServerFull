import {Request} from 'express'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Acabado ??????
export const uploadFile = (files: Request["files"] | any, validFormat: string[] = ['png', 'jpg', 'jpeg', 'gif'], folder:string = '' )=>{

    return new Promise<string>((resolve, reject) => {
        const {file} = files;
        const nameShort: string[] = file.name.split('.');
        const format:string = nameShort[nameShort.length -1];
        // Exntesion obtenida

        if(!validFormat.includes(format)){
            return reject(`La extension ${format} no es valida --- ${validFormat}`);
        }

        // Carpinteria
        const tempName: string = uuidv4() + '.' + format;
        const uploadPath: string = path.join(__dirname, '../uploads/' , folder, tempName);

        file.mv(uploadPath, function(err: Error) {
            if(err){
                reject(err);
            }else{
                resolve(tempName);
            }
        });

    })


}