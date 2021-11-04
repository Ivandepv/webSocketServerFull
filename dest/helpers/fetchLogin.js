"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLogin = void 0;
const fetchLogin = (body) => {
    fetch(process.env.FETCHLOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(console.log)
        .catch(console.log);
};
exports.fetchLogin = fetchLogin;
//# sourceMappingURL=fetchLogin.js.map