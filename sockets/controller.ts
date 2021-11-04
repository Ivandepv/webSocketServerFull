import { Socket, Server } from "socket.io";
import { generarJWTAll } from '../helpers';
import {ChatMsg} from '../models';
const {comprobarJWT} = generarJWTAll;

const chatMsg = new ChatMsg();

export const socketController = async(socket: Socket, io: Server)=>{

    const token = socket.handshake.headers['x-token'];
    const user = await comprobarJWT(token as string);

    if(!user){
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMsg.connectingUser(user);
    io.emit('users-online', chatMsg.usersArr);
    socket.emit('recibir-msg', chatMsg.ultimos10)

    // Conectarlo a una sala especial, privada
    socket.join(user.id);  // global, socket.id, user.id

    // Si hay msgPrivados los envia y si no, crea el array.
    const hayMsgPrivados = chatMsg.createPrivate(user.id);
    if(hayMsgPrivados){
        socket.emit('private-msg', hayMsgPrivados);
    }

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', ()=>{
        chatMsg.desconectarUser(user.id);
        io.emit('users-online', chatMsg.usersArr);
    })

    socket.on('enviar-msg', ({uid, msg})=>{

        if(uid){
            //Mensaje privado
            const msgPrivateArray = chatMsg.sendMsgPrivate(uid, user.id, user.name, msg);
            io.to(uid).emit('private-msg' , msgPrivateArray);
            
        }else{
            chatMsg.sendMsg(user.id, user.name, msg);
            io.emit('recibir-msg', chatMsg.ultimos10);            
        }

    })
        
}