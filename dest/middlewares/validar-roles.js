"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = void 0;
// TIENE ROLE
const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.body.user) {
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el token primero'
            });
        }
        if (!roles.includes(req.body.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-roles.js.map