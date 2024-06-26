import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "./actionType"

import axios from "axios"

const URL = "https://todobackend-ruddy.vercel.app/user/"

export const userLogin = (obj) => async (dispatch) => {
    try {

        dispatch({ type: USER_LOGIN_REQUEST });
        const res = await axios.post(`${URL}login`, obj);
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: {
                msg: res.data.msg,
                token: res.data.token
            }
        })
      localStorage.setItem("token", res.data.token);

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.msg });
    }
}



export const userRegister = (obj) => async (dispatch) => {
    try {

        dispatch({ type: USER_REGISTER_REQUEST });
        const res = await axios.post(`${URL}register`, obj);

        dispatch({
            type: USER_REGISTER_SUCCESS, payload: {
                msg: res.data.msg,
                token: res.data.token
            }
        })
        localStorage.setItem("token", res.data.token);

    } 
    catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.msg });
    }
}