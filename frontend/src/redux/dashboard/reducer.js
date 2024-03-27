
import {
    GET_REQUEST,
    GET_TASK_SUCCESS,
    GET_FAILURE,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    TASK_CREATED,
    CLEAR_MSG,
    GET_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_SUCCESS
} from './actionType';

const initialState = {
    isLoading: true,
    isError: false,
    tasks: [],
    msg: null,
    userData: null
};


export const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_REQUEST:
            return { ...state, isLoading: true, isError: false };

        case GET_TASK_SUCCESS:
            return { ...state, isLoading: false, tasks: payload };

        case GET_FAILURE:
            return { ...state, isLoading: false, isError: true, msg: payload };

        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task => (task._id === payload._id ? payload : task))
            };

        case TASK_CREATED:
            return { ...state, isLoading: false, isError: false, tasks: [...state.tasks, payload.data], msg: payload.msg }

        case DELETE_TASK_SUCCESS:
            return { ...state, tasks: state.tasks.filter(task => task._id !== payload.id), msg: payload.msg };

        case CLEAR_MSG:
            return { ...state, msg: null }


        case GET_USER_DATA_SUCCESS:
            return { ...state, isLoading: false, userData: payload };

        case UPDATE_USER_DATA_SUCCESS:
            return { ...state, userData: payload };
        default:
            return state;
    }
};
