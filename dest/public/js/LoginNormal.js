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
(() => {
    const loginForm = document.getElementById('loginForm');
    const emailLogin = document.getElementById('emailLogin');
    const passwordLogin = document.getElementById('passwordLogin');
    const resultados = document.getElementById('resultados');
    const login = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const body = {
            email: emailLogin.value,
            password: passwordLogin.value
        };
        fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
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
            if (resp.token) {
                localStorage.setItem('token', resp.token);
                resultados.innerHTML = `<span style="color:blue">TOKEN: ${resp.token}</span>`;
                window.location = 'chat.html';
            }
        })
            .catch(console.log);
    });
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener('submit', login);
})();
//# sourceMappingURL=loginNormal.js.map