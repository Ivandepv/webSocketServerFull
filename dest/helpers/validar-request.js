"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.verifyEmail = void 0;
// USUARIOS
const verifyEmail = (email) => {
    const regex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return regex.test(email);
};
exports.verifyEmail = verifyEmail;
const verifyPassword = (password) => {
    const pass = password;
    if (pass.length < 6) {
        return false;
    }
    return true;
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=validar-request.js.map