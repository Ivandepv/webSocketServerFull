"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: [true, 'El role es obligatorio']
    }
});
exports.default = (0, mongoose_1.model)('Role', RoleSchema);
//# sourceMappingURL=role.js.map