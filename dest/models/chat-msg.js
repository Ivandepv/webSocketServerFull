"use strict";
// interface User{
//     id: string,
//     name: string
// }
Object.defineProperty(exports, "__esModule", { value: true });
class Msg {
    constructor(uid, name, msg) {
        this.uid = uid;
        this.name = name;
        this.msg = msg;
    }
}
class ChatMsg {
    constructor() {
        this.msg = [];
        this.users = {};
        this.private = [];
    }
    get ultimos10() {
        this.msg = this.msg.splice(0, 10);
        return this.msg;
    }
    get usersArr() {
        return Object.values(this.users);
    }
    sendMsg(uid, name, msg) {
        this.msg.unshift((new Msg(uid, name, msg)));
    }
    //Uid: quien lo recibe, userId: quien lo envia
    // Crear msg, limitarlo a 10 y devovlerlo.
    sendMsgPrivate(uid, userId, name, msg) {
        if (!this.private[uid]) {
            return;
        }
        this.private[uid] = [...this.private[uid], { uid: userId, name, msg }];
        this.private[uid] = this.private[uid].splice(0, 10);
        console.log(this.private[uid]);
        return this.private[uid];
    }
    // Crear el array o devolverlo.
    createPrivate(uid) {
        if (!this.private[uid]) {
            this.private = Object.assign(Object.assign({}, this.private), { [uid]: [] });
            return null;
        }
        else if (Object.keys(this.private[uid]).length === 0) {
            return null;
        }
        else {
            return this.private[uid];
        }
    }
    connectingUser(user) {
        this.users[user.id] = user;
    }
    desconectarUser(id) {
        delete this.users[id];
    }
}
exports.default = ChatMsg;
//# sourceMappingURL=chat-msg.js.map