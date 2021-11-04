import { Request, Response } from "express"
import { Category } from "../models";

interface Data{
    name: string,
    estado?: boolean

}
 
export const getCategories = async(req: Request, res: Response)=>{
    const { from = 0, to = 5} = req.query;
    const query: {estado: boolean} = {estado: true};

    const [ all, categories ] = await Promise.all([
       Category.countDocuments(query),
       Category.find(query).populate('user', 'name').skip(Number(from)).limit(Number(to))
    ])

    res.json({all,categories});
}

export const getCategory = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json(category);
}

export const postCategory = async(req: Request, res: Response)=>{
    const {name}:{name: string} = req.body;

    // Verificar si existe
    const categoryDB = await Category.findOne({name: name.toUpperCase()});
    if(categoryDB && categoryDB.estado === true){
        return res.status(400).json({
            msg: `La categoria ${categoryDB.name} ya existe`
        });
    }
    // Generar data y crear
    const data = {
        name: name.toUpperCase(),
        user: req.body.user.id
    }
    const category = new Category(data);
    // Guardado
    await category.save();

    res.json(category);
}

export const putCategory = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {name, estado}:Data  = req.body;

    if(typeof estado !== 'boolean' && estado !== undefined){
        return res.status(400).json({
            msg: 'El estado debe ser un boolean'
        })        
    }

    // Optimizar esto en post tambien se utiliza.
    const categoryDB = await Category.findOne({name: name.toUpperCase()});

    if(categoryDB && categoryDB.estado === true){
        return res.status(400).json({
            msg: `ya hay una categoria llamada ${name}`
        });
    }
    const category = await Category.findByIdAndUpdate(id, {name: name.toUpperCase(), estado}, { new:true });
    
    res.json(category);
}

export const deleteCategory = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {estado:false}, {new: true});
    res.json(category);
}