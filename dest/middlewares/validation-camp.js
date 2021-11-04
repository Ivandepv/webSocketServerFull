"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCamp = void 0;
const express_validator_1 = require("express-validator");
const validationCamp = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validationCamp = validationCamp;
//# sourceMappingURL=validation-camp.js.map