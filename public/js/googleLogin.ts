// Tiene que estar en nivel global, ya que la libreria de google no permite que este en un nivel inferior

    const resultados = <HTMLDivElement>document.getElementById('resultados');

    var url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api' 
    : "https://restfulservercompleted.herokuapp.com/api"
    
    // Verificacion google y normal
    // TODO signin with google and sign out cambio
    
    
    function handleCredentialResponse(response:any){
    
        const body = {id_token: response.credential};
        // Cambiar a una variable de entorno
        fetch(`${url}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp=>{
            console.log(resp);
            while (resultados.firstChild) {
                resultados.removeChild(resultados.firstChild);
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
        .catch(console.warn);
        
    
    }
    
    const button = document.getElementById('google_signout');
    
    // Ignore google it's working
    
    button?.addEventListener( 'click' ,()=>{
        console.log(google.accounts.id);
        google.accounts.id.disableAutoSelect();
    
        google.accounts.id.revoke(localStorage.getItem('email'), (done: Function) =>{
            localStorage.clear();
            location.reload();
        });
    
        
    });
    
