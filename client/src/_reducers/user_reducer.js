import {
    LOGIN_USER, REGISTER_USER, AUTH_EMAIL, AUTH_USER, LOGOUT_USER
} from '../_actions/types'
//변화를 일으키는 함수
//현재의 상태와 액션을 참조하여 새로운 상태를 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) { //state는 이전상태
    switch (action.type) { //Action에는 여러 타입 존재함. 이타임에 따라 다르게 반응하도록 작성
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } 
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_EMAIL:
            return { ...state, sendCodeSuccess: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload } // ...: spread operator는 파라미터 state를 그대로 가져온 것으로 빈 상태를 의미
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload }
        default:
            return state;
    }
}

/* 디스패치 (dispatch) */
// 스토어의 내장함수
// 액션을 발생 시키는 것

/* 스토어 (Store) */
// 한 애플리케이션당 하나의 스토어
// 현재의 앱 상태와, 리듀서, 내장함수 포함

