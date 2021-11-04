
// USUARIOS
export const verifyEmail = (email:string)=>{
 
    const regex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return regex.test(email);
}

export const verifyPassword = (password:string)=>{
    const pass = password;
    if(pass.length < 6){
        return false;
    }

    return true;
}