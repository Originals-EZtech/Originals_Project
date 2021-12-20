import {
    LOGIN_USER, REGISTER_USER, AUTH_EMAIL, AUTH_USER
} from '../_actions/types'
// sendCodeSuccess
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) { //state는 이전상태
    switch (action.type) { //Action에는 여러 타입 존재함. 이타임에 따라 다르게 반응하도록 작성
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // ...: spread operator는 파라미터 state를 그대로 가져온 것으로 빈 상태를 의미
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_EMAIL:
            return { ...state, sendCodeSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
}