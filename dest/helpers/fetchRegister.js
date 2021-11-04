"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRegister = void 0;
const fetchRegister = (body) => {
    fetch(process.env.FETCHREGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(console.log)
        .catch(console.log);
};
exports.fetchRegister = fetchRegister;
//# sourceMappingURL=fetchRegister.js.map