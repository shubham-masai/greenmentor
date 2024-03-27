import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./user/reducer"
import { taskReducer } from "./dashboard/reducer"
const RootReducer = combineReducers({
    userReducer,
    taskReducer
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))