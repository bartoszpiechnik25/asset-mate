import { jwtDecode } from "jwt-decode"

const getToken = (): string|null => {
    return localStorage.getItem('token');
}

const extractUserDetails = (token: string): {id: string, username: string, exp: number} => {
    const decoded = JSON.parse(JSON.stringify(jwtDecode(token)));
    const userDetails = {
        id: decoded.id,
        username: decoded.sub,
        exp: decoded.exp
    }
    return userDetails;
}

const validToken = (token: string): boolean => {
    const expTimestamp = jwtDecode(token).exp;
    if (expTimestamp === null) {
        return false;
    }
    console.log(expTimestamp, Date.now());
    if (expTimestamp !== undefined && Date.now() > expTimestamp * 1000) {
        return false;
    }
    return true;
}

export {extractUserDetails, validToken, getToken};