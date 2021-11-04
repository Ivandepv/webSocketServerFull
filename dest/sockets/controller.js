"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const { comprobarJWT } = helpers_1.generarJWTAll;
const chatMsg = new models_1.ChatMsg();
const socketController = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    const token = socket.handshake.headers['x-token'];
    const user = yield comprobarJWT(token);
    if (!user) {
        return socket.disconnect();
    }
    // Agregar el usuario conectado
    chatMsg.connectingUser(user);
    io.emit('users-online', chatMsg.usersArr);
    socket.emit('recibir-msg', chatMsg.ultimos10);
    // Conectarlo a una sala especial, privada
    socket.join(user.id); // global, socket.id, user.id
    // Si hay msgPrivados los envia y si no, crea el array.
    const hayMsgPrivados = chatMsg.createPrivate(user.id);
    if (hayMsgPrivados) {
        socket.emit('private-msg', hayMsgPrivados);
    }
    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMsg.desconectarUser(user.id);
        io.emit('users-online', chatMsg.usersArr);
    });
    socket.on('enviar-msg', ({ uid, msg }) => {
        if (uid) {
            //Mensaje privado
            const msgPrivateArray = chatMsg.sendMsgPrivate(uid, user.id, user.name, msg);
            io.to(uid).emit('private-msg', msgPrivateArray);
        }
        else {
            chatMsg.sendMsg(user.id, user.name, msg);
            io.emit('recibir-msg', chatMsg.ultimos10);
        }
    });
});
exports.socketController = socketController;
//# sourceMappingURL=controller.js.map