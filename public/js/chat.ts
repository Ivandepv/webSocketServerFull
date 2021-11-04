interface Msg{
    uid: string,
    name: string,
    msg: string
}

// Referencias html
const txtUid        = <HTMLInputElement>document.getElementById('txtUid');    
const txtMsg        = <HTMLInputElement>document.getElementById('txtMsg');   
const ulGlobalMsg   = <HTMLUListElement>document.getElementById('ulGlobalMsg');
const ulPrivateMsg  = <HTMLUListElement>document.getElementById('ulPrivateMsg');
const ulUsers       = <HTMLUListElement>document.getElementById('ulUsers');
const btnLogout     = <HTMLButtonElement>document.getElementById('btnLogout');


let socket:any;
// TODO: Conectar socket

(()=>{
    const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api' 
    : "https://websocketserveriv.herokuapp.com/api"

    // Validar el token del local storage
    const validarJWT = async()=>{

        const token = localStorage.getItem('token') || '';

        if(token.length <= 10){
            (window.location as any) = 'index.html';
            throw new Error('No hay token en el servidor');
        }
        
        const resp = await fetch(`${url}/auth`, {
            headers: {'x-token': token}
        })

        const {user: userDB, token: tokenDB} = await resp.json();

        localStorage.setItem('token', tokenDB);
        console.log(userDB, tokenDB);

        document.title = userDB.name;

        await conectarSocket();
        
    }


    const conectarSocket = async()=>{
        socket = (window as any ).io({
            'extraHeaders': {
                'x-token': localStorage.getItem('token')
            }
        });

        socket.on('connect', ()=>{
            console.log('online');
            
        });    
        
        socket.on('disconnect', ()=>{
            console.log('offline');
        });   

        socket.on('recibir-msg', paintMsg);
        socket.on('users-online', paintUsers);

        socket.on('private-msg', paintMsgPrivate);
    }


    const paintUsers = (users = [])=>{
        let msgHTML:string = '';
        users.forEach(({name, uid})=>{

            msgHTML += `
            
                <li>
                    <p>
                        <h5 class="text-success">${name}</h5>
                        <span class="text-muted" >${uid}</span>
                    </p>
                </li>
            `;
        });

        ulUsers!.innerHTML = msgHTML;
    }

    const paintMsg = (msg: Msg[]= [])=>{
        let msgHTML:string = '';
        msg.forEach(({msg, name})=>{

            msgHTML += `
            
                <li>
                    <p>
                        <span class="text-primary">${name}</span>
                        <span class="text-muted" >${msg}</span>
                    </p>
                </li>
            `;
        });

        ulGlobalMsg!.innerHTML = msgHTML;
    }

    const paintMsgPrivate = (msg: Msg[] = []) =>{
        let msgHTML:string = '';
        msg.forEach(({msg, name})=>{

            msgHTML += `
            
                <li>
                    <p>
                        <span class="text-primary">${name}</span>
                        <span class="text-muted" >${msg}</span>
                    </p>
                </li>
            `;
        });

        ulPrivateMsg!.innerHTML = msgHTML;
    }

    // Funciona
    btnLogout?.addEventListener('click', ()=>{
       localStorage.removeItem('token');
       (window as any).location = 'index.html';

    })

    txtMsg?.addEventListener('keyup', ({key})=>{
        if(key !== 'Enter'){return;}

        const msg = txtMsg.value.trim();
        const uid = txtUid.value.trim();

        if(msg.length === 0){return;}

        socket.emit('enviar-msg', {msg, uid})
        txtMsg.value = '';
        
    });


    const main = async()=>{
        await validarJWT();
    }

    main();

})()