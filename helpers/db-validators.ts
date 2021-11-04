import Role from '../models/role'

// Usuarios


export const esRoleValido = async(role: string = 'USER_ROLE')=>{
    const rol = await Role.findOne({role});

    if(!rol){
        throw new Error(`No existe el rol ${role}`);
    }
}