import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk } from "redux-thunk";
import { userReducer } from "./user/reducer"
const RootReducer = combineReducers({
    userReducer
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))