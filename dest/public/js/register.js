"use strict";
(() => {
    const emailRegister = document.getElementById('emailRegister');
    const passwordRegister = document.getElementById('passwordRegister');
    const password2Register = document.getElementById('password2Register');
    const nameRegister = document.getElementById('nameRegister');
    const resultados = document.getElementById('resultados');
    const formRegister = document.getElementById('formRegister');
    // hacer fetch
    const registerFetch = (body) => {
        var url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api'
            : "https://restfulservercompleted.herokuapp.com/api";
        fetch(`${url}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
            console.log(resp);
            // imprimir errores en consola y pantalla
            // Eliminando todos los hijos de un elemento
            while (resultados.firstChild) {
                resultados.removeChild(resultados.firstChild);
            }
            console.log(resp);
            if (resp.errors) {
                const fragment = document.createDocumentFragment();
                resp.errors.forEach((error) => {
                    const span = document.createElement('SPAN');
                    span.innerText = error.msg;
                    fragment.appendChild(span);
                });
                return resultados.appendChild(fragment);
            }
            if (resp.msg) {
                resultados.innerHTML = `<span>${resp.msg}</span>`;
            }
            fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: resp.email,
                    password: passwordRegister.value
                })
            })
                .then(resp => resp.json())
                .then(resp => {
                console.log(resp);
                if (resp.token) {
                    resultados.innerHTML = `<span style="color:blue">TOKEN: ${resp.token}</span>`;
                }
            })
                .catch(console.log);
        })
            .catch(console.log);
    };
    const register = (e) => {
        e.preventDefault();
        const body = {
            email: emailRegister.value,
            password: passwordRegister.value,
            name: nameRegister.value
        };
        registerFetch(body);
    };
    formRegister.addEventListener('submit', register);
})();
//# sourceMappingURL=register.js.map