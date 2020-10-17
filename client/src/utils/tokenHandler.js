//import * as jwt from "jsonwebtoken";

// function verifyToken(token) {
//     const decoded = jwt.decode(token, "token");
//     return decoded !== null;
// }

export function isLogin(){
    if (getToken() /*&& verifyToken(getToken())*/) {
        return true;
    }
    return false
}

export function setToken(token){
    localStorage.setItem("token", token);
}

export function logOut(){
    localStorage.removeItem("token");
}

export function getToken(){
    return localStorage.getItem("token");
}
