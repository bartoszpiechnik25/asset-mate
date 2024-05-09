import { jwtDecode } from "jwt-decode";

export interface User {
  id: string;
  username: string;
  exp: number;
}

const setUser = (): User | null => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const parsedToken = JSON.parse(JSON.stringify(jwtDecode(token)));
    return {
        id: parsedToken.id,
        username: parsedToken.sub,
        exp: Number(parsedToken.exp)
    }
}

const isValid = (user: User): boolean => {
    if (Date.now() / 1000 > user.exp) {
        return false;
    }
    return true;
}

const getToken = (): string|null => {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    return null;
}

export {isValid, setUser, getToken};