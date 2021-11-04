// interface User{
//     id: string,
//     name: string
// }

import { UserInterface } from "./user";

class Msg{
    public uid:string;
    public name:string;
    public msg:string;

    constructor(uid:string, name:string, msg:string){
        this.uid = uid;
        this.name = name;
        this.msg = msg;
    }
}




class ChatMsg {
    public msg: Msg[] = [] ;
    public users: any    = {};
    public private: any = [];

    constructor(){
        
    }

    get ultimos10(): Msg[] {
        this.msg = this.msg.splice(0,10);
        return this.msg;
    }

    get usersArr(): string[] {
        return Object.values(this.users);
    }

    sendMsg(uid: string, name: string, msg: string  ){
        (this.msg as any).unshift(
            (new Msg(uid, name, msg))
        )
    }
    //Uid: quien lo recibe, userId: quien lo envia
    // Crear msg, limitarlo a 10 y devovlerlo.
    sendMsgPrivate(uid: string, userId: string, name: string, msg: string  ){
        if(!this.private[uid]){
            return;
        }

        this.private[uid] =  [ ...this.private[uid] , {uid: userId, name, msg}] ;
        this.private[uid] = this.private[uid].splice(0,10);
        return this.private[uid];
    }

    // Crear el array o devolverlo.
    createPrivate(uid: string){ 
        
        if(!this.private[uid]){
            this.private = {...this.private, [uid]: []};            
            return null;
        }else if(Object.keys(this.private[uid]).length === 0 ){
            return null;
        }else{
            return this.private[uid];
        }
    }

    connectingUser(user: UserInterface){
        this.users[user.id as string] = user;
    }

    desconectarUser(id: string){
        delete this.users[id];
    }

}

export default ChatMsg;