"use strict";
// import routerProduct from './products';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUpload = exports.routerSearch = exports.routerUser = exports.routerProduct = exports.routerCategory = exports.routerAuth = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.routerAuth = auth_1.default;
const category_1 = __importDefault(require("./category"));
exports.routerCategory = category_1.default;
const product_1 = __importDefault(require("./product"));
exports.routerProduct = product_1.default;
const search_1 = __importDefault(require("./search"));
exports.routerSearch = search_1.default;
const upload_1 = __importDefault(require("./upload"));
exports.routerUpload = upload_1.default;
const users_1 = __importDefault(require("./users"));
exports.routerUser = users_1.default;
//# sourceMappingURL=index.js.map