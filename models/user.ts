import {Schema, model} from 'mongoose';
import { DataReq } from '../controllers/users'

export interface UserInterface{
    name: string,
    email: string,
    password: string,
    role: string,
    img?: string,
    estado?: boolean,
    google?: boolean,
    id?: string
}


const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'la contrasena es obligatoria']
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})
// TODO: method

UserSchema.methods.toJSON = function(){
    const {__v, _id, password, ...userData}: DataReq = this.toObject();
    const user = {...userData, uid: _id };
    return user;
}
    



export default model<UserInterface>('User', UserSchema);