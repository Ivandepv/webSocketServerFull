import {Schema, model} from 'mongoose';

export interface ProductInterface {
    name: string,
    price?: number,
    description?: string,
    estado: boolean,
    avaible?: boolean,
    img?:   string,   
    category: Schema.Types.ObjectId
    user: Schema.Types.ObjectId,
    __v?: number
}

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    available:{
        type: Boolean,
        default: true,
    },
    img: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'la referencia a la categoria es obligatoria']
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'la referencia al usuario es obligatoria']
    }
});

ProductSchema.methods.toJSON = function(){
    const {__v, estado, ...data}:ProductInterface = this.toObject();
    return data;
};

export default model<ProductInterface>('Product', ProductSchema);