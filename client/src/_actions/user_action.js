import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER, AUTH_EMAIL
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

export function authEmail(dataTosubmit) {

    console.log('yes');
    // const request = axios.post('/api/users/emailauth', dataTosubmit)
    //     .then(response =>  console.log(response.data))

    // return {
    //     type: AUTH_EMAIL,
    //     payload: request
    // }
}