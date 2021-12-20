import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER, AUTH_EMAIL, AUTH_USER
} from './types';

export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response =>  response.data)
        

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {

    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response =>  response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}


// auth email 
export function authEmail(dataTosubmit) {

    const request = axios.post('/api/users/emailauth', dataTosubmit)
        .then(response => response.data)

    return {
        type: AUTH_EMAIL,
        payload: request
    }
}

// auth token 
export function auth() {
    console.log("여긴가?")
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}