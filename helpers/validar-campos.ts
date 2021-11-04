import { Category, Product, User, Role } from "../models";

// Usuarios
export const userExist = async(id:string)=>{
    const user = await User.findById(id);

    if(!user){
        throw new Error(`el usuario con el id ${id} no existe`)
    }
} 

export const userExistEstado = async(id:string)=>{
    const user = await User.findById(id);
    if(!user?.estado){
        throw new Error(`el usuario con el id ${id} no existe`)
    }
}

export const emailExist = async(email: string)=>{
    const emailExists = await User.findOne({email});
    if(emailExists){
        throw new Error('El Email ya esta en uso');
    }
}

export const esRoleValido = async(role: string = 'USER_ROLE')=>{
    const rol = await Role.findOne({role});

    if(!rol){
        throw new Error(`No existe el rol ${role}`);
    }
}

// Category

export const categoryExistById = async(id: string)=>{

    const category = await Category.findById(id);
    if(!category){
        throw new Error(`la categoria por id ${id} no existe`) 
    }
}

export const categoryDeleted = async (id: string)=>{
    const category = await Category.findById(id);
    
    if(!category!.estado){
      throw new Error(`El id: ${id} esta eliminado`);
    }
  
  };


// Product

export const productExistById = async(id: string)=>{
    const product = await Product.findById(id);
    
    if(!product){
      throw new Error(`El id: ${id} no existe`);
    }
}

export const productDeleted = async(id: string)=>{
    const product = await Product.findById(id);
    
    if(!product!.estado){
      throw new Error(`El id: ${id} esta eliminado`);
    }
}

// Upload

export const collectionsAllowed = (collection:string = '', collections: string[] = [])=>{

    if(!collections.includes(collection)){
       throw new Error(`La collection ${collection} no esta en las collections permitidas - ${collections}`);
    }

    return true;
};