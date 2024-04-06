
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USE_MSG_CLEAR
} from "./actionType"

const initialState = {
    isLoading: false,
    isError: false,
    msg: null,
    token: localStorage.getItem("token") || null
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case USER_LOGIN_REQUEST:
            return { ...state, isLoading: true, isError: false };

        case USER_LOGIN_SUCCESS:
            return { ...state, isLoading: false, isError: false, msg: payload.msg, token: payload.token }

        case USER_LOGIN_FAIL:
            return { ...state, isLoading: false, isError: true, msg: payload }

        case USER_REGISTER_REQUEST:
            return { ...state, isLoading: true, isError: false };

        case USER_REGISTER_SUCCESS:
            return { ...state, isLoading: false, isError: false, msg: payload.msg, token: payload.token }

        case USER_REGISTER_FAIL:
            return { ...state, isLoading: false, isError: true, msg: payload }

        case USER_LOGOUT:
            return { ...state, token: null };

        case USE_MSG_CLEAR:
            return { ...state, msg: null }

        default: return state
    }
}