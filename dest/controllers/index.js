"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = exports.searchController = exports.usersController = exports.productsController = exports.categoriesController = exports.authController = void 0;
const authController = __importStar(require("./auth"));
exports.authController = authController;
const categoriesController = __importStar(require("./categories"));
exports.categoriesController = categoriesController;
const productsController = __importStar(require("./products"));
exports.productsController = productsController;
const usersController = __importStar(require("./users"));
exports.usersController = usersController;
const searchController = __importStar(require("./search"));
exports.searchController = searchController;
const uploadController = __importStar(require("./upload"));
exports.uploadController = uploadController;
//# sourceMappingURL=index.js.map