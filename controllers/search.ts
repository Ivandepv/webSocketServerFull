import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { User, Category, Product } from "../models";

// Colecciones permitidas, son los modelos que hay.
const collections = {
    categories: 'categories',
    products: 'products',
    users: 'users'
}


// User
const searchUsers = async(termino:string = '', res: Response)=>{
    const esmongoId: boolean = isValidObjectId(termino); 

    if(esmongoId){
        const user = await User.findById(termino);
        return res.json({
            results: (user)? user : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const users = await User.find({name: regex, estado: true});

    res.json({
        results: users
    })

};

// Category
const searchCategories = async(termino:string = '', res: Response)=>{
    const esmongoId: boolean = isValidObjectId(termino); 

    if(esmongoId){
        const category = await Category.findById(termino);
        return res.json({
            results: (category)? category : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const categories = await Category.find({name: regex, estado: true});

    res.json({
        results: categories
    })
};

// Product
const searchProducts = async(termino:string = '', res: Response)=>{
    const esmongoId: boolean = isValidObjectId(termino); 

    if(esmongoId){
        const product = await Product.findById(termino);
        return res.json({
            results: (product)? product : []
        })
    }

    const regex = new RegExp(termino, 'i');
    const products = await Product.find({name: regex, estado: true});

    res.json({
        results: products
    })
};






// switch para ver que coleccion es
export const buscar = (req: Request, res: Response)=>{

    const {collection, term} = req.params;
    // Verificar si se encuentra la coleccion
    if(!Object.keys(collections).includes(collection)){
        return res.status(400).json({
            msg: `colecciones permitidas [ ${Object.keys(collections)} ]`
        });
    }

    switch(collection){
        case collections.categories: 

            searchCategories(term, res);
         break;
        case collections.products: 

            searchProducts(term, res);
         break;
        case collections.users:

            searchUsers(term, res);
         break;
         
        default:
            res.status(500).json({
                msg: 'avisar al administrador u encargado de hacer el back end'
            });
    }
}