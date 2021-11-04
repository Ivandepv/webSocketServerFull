import {Schema, model} from 'mongoose';

interface Category {
    name: string;
    estado: boolean;
    user: Schema.Types.ObjectId
    __v?: number
}

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'la referencia al usuario es obligatoria']
        
    }
});

CategorySchema.methods.toJSON = function(){
    const {__v, estado, ...data}:Category = this.toObject();
    return data;
}

export default model<Category>('Category', CategorySchema);