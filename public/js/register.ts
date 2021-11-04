(()=>{
    const emailRegister = <HTMLInputElement>document.getElementById('emailRegister');
    const passwordRegister = <HTMLInputElement>document.getElementById('passwordRegister');
    const password2Register = <HTMLInputElement>document.getElementById('password2Register');
    const nameRegister = <HTMLInputElement>document.getElementById('nameRegister');
    const resultados = <HTMLDivElement>document.getElementById('resultados');
    const formRegister = <HTMLFormElement>document.getElementById('formRegister');
    
    
    type error = {
        location: string,
        msg: string,
        param:string,
        value: string
    }

    // hacer fetch
    
    const registerFetch = (body: Object)=>{
        var url = (window.location.hostname.includes('localhost'))
        ? 'http://localhost:8080/api' 
        : "https://restfulservercompleted.herokuapp.com/api"
        
        fetch(`${url}/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:    JSON.stringify(body)
        })
        .then(resp=> resp.json())
        .then(resp => {
            console.log(resp);
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
    
            fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body:    JSON.stringify({
                    email: resp.email,
                    password: passwordRegister.value
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                if(resp.token){
                    resultados.innerHTML = `<span style="color:blue">TOKEN: ${resp.token}</span>`
                }
            })
            .catch(console.log);     
    
        })
        .catch(console.log);
    }
    
    
    
    
    const register = (e:Event)=>{
        e.preventDefault();
        const body = {
            email: emailRegister.value,
            password: passwordRegister.value,
            name: nameRegister.value     
        }
        
        registerFetch(body);
    }
    
    formRegister.addEventListener('submit', register);
})()
