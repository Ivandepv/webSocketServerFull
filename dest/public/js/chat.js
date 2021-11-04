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
// Referencias html
const txtUid = document.getElementById('txtUid');
const txtMsg = document.getElementById('txtMsg');
const ulGlobalMsg = document.getElementById('ulGlobalMsg');
const ulPrivateMsg = document.getElementById('ulPrivateMsg');
const ulUsers = document.getElementById('ulUsers');
const btnLogout = document.getElementById('btnLogout');
let socket;
// TODO: Conectar socket
(() => {
    const url = (window.location.hostname.includes('localhost'))
        ? 'http://localhost:8080/api'
        : "https://restfulservercompleted.herokuapp.com/api";
    // Validar el token del local storage
    const validarJWT = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = localStorage.getItem('token') || '';
        if (token.length <= 10) {
            window.location = 'index.html';
            throw new Error('No hay token en el servidor');
        }
        const resp = yield fetch(`${url}/auth`, {
            headers: { 'x-token': token }
        });
        const { user: userDB, token: tokenDB } = yield resp.json();
        localStorage.setItem('token', tokenDB);
        console.log(userDB, tokenDB);
        document.title = userDB.name;
        yield conectarSocket();
    });
    const conectarSocket = () => __awaiter(void 0, void 0, void 0, function* () {
        socket = window.io({
            'extraHeaders': {
                'x-token': localStorage.getItem('token')
            }
        });
        socket.on('connect', () => {
            console.log('online');
        });
        socket.on('disconnect', () => {
            console.log('offline');
        });
        socket.on('recibir-msg', paintMsg);
        socket.on('users-online', paintUsers);
        socket.on('private-msg', paintMsgPrivate);
    });
    const paintUsers = (users = []) => {
        let msgHTML = '';
        users.forEach(({ name, uid }) => {
            msgHTML += `
            
                <li>
                    <p>
                        <h5 class="text-success">${name}</h5>
                        <span class="text-muted" >${uid}</span>
                    </p>
                </li>
            `;
        });
        ulUsers.innerHTML = msgHTML;
    };
    const paintMsg = (msg = []) => {
        let msgHTML = '';
        msg.forEach(({ msg, name }) => {
            msgHTML += `
            
                <li>
                    <p>
                        <span class="text-primary">${name}</span>
                        <span class="text-muted" >${msg}</span>
                    </p>
                </li>
            `;
        });
        ulGlobalMsg.innerHTML = msgHTML;
    };
    const paintMsgPrivate = (msg = []) => {
        let msgHTML = '';
        msg.forEach(({ msg, name }) => {
            msgHTML += `
            
                <li>
                    <p>
                        <span class="text-primary">${name}</span>
                        <span class="text-muted" >${msg}</span>
                    </p>
                </li>
            `;
        });
        ulPrivateMsg.innerHTML = msgHTML;
    };
    // Funciona
    btnLogout === null || btnLogout === void 0 ? void 0 : btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location = 'index.html';
    });
    txtMsg === null || txtMsg === void 0 ? void 0 : txtMsg.addEventListener('keyup', ({ key }) => {
        if (key !== 'Enter') {
            return;
        }
        const msg = txtMsg.value.trim();
        const uid = txtUid.value.trim();
        if (msg.length === 0) {
            return;
        }
        socket.emit('enviar-msg', { msg, uid });
        txtMsg.value = '';
    });
    const main = () => __awaiter(void 0, void 0, void 0, function* () {
        yield validarJWT();
    });
    main();
})();
//# sourceMappingURL=chat.js.map