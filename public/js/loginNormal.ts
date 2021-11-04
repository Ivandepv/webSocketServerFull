(()=>{

    const loginForm = <HTMLFormElement>document.getElementById('loginForm');
    const emailLogin = <HTMLInputElement>document.getElementById('emailLogin');
    const passwordLogin = <HTMLInputElement>document.getElementById('passwordLogin');
    const resultados = <HTMLDivElement>document.getElementById('resultados');
    
    type error = {
        location: string,
        msg: string,
        param:string,
        value: string
    }
    
    
    const login = async(e: Event)=>{
        e.preventDefault();
    
        const body = {
            email: emailLogin.value,
            password: passwordLogin.value
        }
    
        fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:    JSON.stringify(body)
        })
        .then(resp=> resp.json())
        .then(resp=>{
            // imprimir errores en consola y pantalla
    
            // Eliminando todos los hijos de un elemento
            while (resultados.firstChild) {
            resultados.removeChild(resultados.firstChild);
            }
            
            console.log(resp);
            if(resp.errors){
                const fragment = document.createDocumentFragment();
                resp.errors.forEach( (error:error) => {
                    const span = document.createElement('SPAN');
                    span.innerText = error.msg;
                    fragment.appendChild(span);
                });
                return resultados.appendChild(fragment);
            }
    
            if(resp.msg){
                resultados.innerHTML = `<span>${resp.msg}</span>`
            }
    
            if(resp.token){
                localStorage.setItem('token', resp.token);
                resultados.innerHTML = `<span style="color:blue">TOKEN: ${resp.token}</span>`;
                (window.location as any) = 'chat.html';
            }
        })
        .catch(console.log);
    
    }
    
    loginForm?.addEventListener('submit', login);
})()
