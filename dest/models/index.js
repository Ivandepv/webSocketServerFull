"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Server = exports.Role = exports.Product = exports.ChatMsg = exports.Category = void 0;
const category_1 = __importDefault(require("./category"));
exports.Category = category_1.default;
const chat_msg_1 = __importDefault(require("./chat-msg"));
exports.ChatMsg = chat_msg_1.default;
const product_1 = __importDefault(require("./product"));
exports.Product = product_1.default;
const role_1 = __importDefault(require("./role"));
exports.Role = role_1.default;
const server_1 = __importDefault(require("./server"));
exports.Server = server_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
//# sourceMappingURL=index.js.map