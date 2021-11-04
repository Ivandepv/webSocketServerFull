import { Request, Response } from "express"
import { Product } from "../models";
import { ProductInterface } from '../models/product';


export const getProducts = async(req: Request, res: Response)=>{
    const { from = 0, to = 5} = req.query;
    const query: {estado: boolean} = {estado: true};

    const [ all, products ] = await Promise.all([
       Product.countDocuments(query),
       Product.find(query)
       .populate('user', 'name')
       .populate('category', 'name').skip(Number(from)).limit(Number(to))
    ])

    res.json({all,products});
}

export const getProduct = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');
    res.json(product);
}

export const postProduct = async(req: Request, res: Response)=>{
    const {name, estado, user, ...body}:ProductInterface = req.body;

    // Verificar si existe
    const productDB = await Product.findOne({name: name.toUpperCase()});
    if(productDB && productDB.estado === true){
        return res.status(400).json({
            msg: `El producto ${productDB.name} ya existe`
        });
    }
    // Generar data y crear
    const data = {
        name: name.toUpperCase(),
        ...body,
        user: req.body.user.id
    }
    const product = new Product(data);
    // Guardado
    await product.save();

    res.json(product);
}

export const putProduct = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {name, estado, user, __v,   ...body}:ProductInterface  = req.body;

    if(typeof estado !== 'boolean' && estado !== undefined){
        return res.status(400).json({
            msg: 'El estado debe ser un boolean'
        })        
    }

    // Verificar si viene nombre pasarloa a mayusculas porque si no, da error
    let nameProcesado = name;
    if(name){
        nameProcesado = name.toUpperCase();
    }

    // Optimizar esto en post tambien se utiliza.
    const productDB = await Product.findOne({name: nameProcesado});

    if(productDB && productDB.estado === true){
        return res.status(400).json({
            msg: `ya hay un producto llamado ${name}`
        });
    }
    // Generar data a guardar
    const data: ProductInterface = {
        name: nameProcesado ,
        ...body,
        estado,
        user: req.body.user.id
    }

    const product = await Product.findByIdAndUpdate(id, data, { new:true });
    
    res.json(product);
}

export const deleteProduct = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {estado:false}, {new: true});
    res.json(product);
}