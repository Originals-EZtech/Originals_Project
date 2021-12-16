import {
    LOGIN_USER, REGISTER_USER, AUTH_EMAIL
} from '../_actions/types'
// sendCodeSuccess
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        // case AUTH_EMAIL:
        //     return { ...state, sendCodeSuccess: action.payload }
        default:
            return state;
    }
}