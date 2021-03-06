import http from './httpService';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';
const apiEndpoint = 'auth/';

http.setJwt(getJwt());

export async function login(email, password) {
    const {data:jwt} = await http.post(apiEndpoint, {email, password});
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = getJwt();
        return jwtDecode(jwt);        
      } catch (error) {
        return null;
      }
}

