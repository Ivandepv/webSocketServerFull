"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
// Extraccion de importaciones
const { buscar } = controllers_1.searchController;
const router = (0, express_1.Router)();
router.get('/:collection/:term', buscar);
exports.default = router;
//# sourceMappingURL=search.js.map