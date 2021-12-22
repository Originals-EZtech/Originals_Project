import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER, AUTH_EMAIL, AUTH_USER
} from './types';

//상태에 변화가 필요할 때 발생시킴 (객체하나로 표현)
//type을 필수로 그외의 값들은 개발자 마음대로 생성

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
    const request = axios.get('/api/users/auth') //endpoint로 get request, get이니까 login과 다르게 param x
        .then(response => response.data)

    return { //Action 끝내고 이제 Reducer로 보냄
        type: AUTH_USER,
        payload: request
    }
}