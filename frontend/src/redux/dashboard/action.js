
import {
    GET_REQUEST,
    GET_TASK_SUCCESS,
    GET_FAILURE,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    TASK_CREATED,
    GET_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_SUCCESS
} from './actionType';

import axios from "axios"
const URL = "https://todobackend-ruddy.vercel.app/task/"
const URL1 = "https://todobackend-ruddy.vercel.app/profile/"
const token = localStorage.getItem("token");

export const getAllTasks = () => async (dispatch) => {
    try {

        dispatch({ type: GET_REQUEST });
        const res = await axios.get(`${URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({ type: GET_TASK_SUCCESS, payload: res.data })
    } catch (error) {
        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}

export const createTask = (obj) => async (dispatch) => {
    try {

        dispatch({ type: GET_REQUEST });
        const res = await axios.post(`${URL}create`, obj, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({
            type: TASK_CREATED, payload: {
                data: res.data.newTask,
                msg: res.data.msg
            }
        })
    } catch (error) {
        console.log("here error", error.response.data.msg)
        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}

export const editTask = (id, obj) => async (dispatch) => {
    try {

        dispatch({ type: GET_REQUEST });
        const res = await axios.put(`${URL}${id}`, obj, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        dispatch({ type: UPDATE_TASK_SUCCESS, payload: res.data })
    } catch (error) {
        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}



export const editTaskStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REQUEST });
        const res = await axios.put(`${URL}${id}/status`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({
            type: UPDATE_TASK_SUCCESS, payload: res.data
        })
    } catch (error) {
        console.log(error.response.data.msg)
        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REQUEST });
        const res = await axios.delete(`${URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({
            type: DELETE_TASK_SUCCESS, payload: {
                id,
                msg: res.data
            }
        })
    } catch (error) {
        console.log(error.response.data.msg)
        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}


export const getUserData = () => async (dispatch) => {
    try {
        dispatch({ type: GET_REQUEST })
        const res = await axios.get(`${URL1}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({ type: GET_USER_DATA_SUCCESS, payload: res.data })
    } catch (error) {

        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}

export const updateUserData = (obj) => async (dispatch) => {
    try {
        dispatch({ type: GET_REQUEST })
        const res = await axios.put(`${URL1}`,obj, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        dispatch({ type:  UPDATE_USER_DATA_SUCCESS, payload: res.data })
    } catch (error) {
        dispatch({ type: GET_FAILURE, payload: error.response.data.msg });
    }
}