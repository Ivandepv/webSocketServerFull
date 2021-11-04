import {Schema, model} from 'mongoose'

interface Role{
    role: string
}

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
});

export default model<Role>('Role', RoleSchema)