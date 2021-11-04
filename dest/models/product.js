"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
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
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'la referencia a la categoria es obligatoria']
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'la referencia al usuario es obligatoria']
    }
});
ProductSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, estado } = _a, data = __rest(_a, ["__v", "estado"]);
    return data;
};
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=product.js.map