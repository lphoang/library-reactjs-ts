import { all, delay, put, takeLatest } from "@redux-saga/core/effects";

import { ActionTypes } from "utils/actionTypes";

// Login
export function* login(){
    yield delay(400);
    yield put({
        type: ActionTypes.USER_LOGIN_SUCCESS
    });
}


//Register
export function* register(){
    yield delay(400);
    yield put({
        type: ActionTypes.USER_REGISTER_SUCCESS
    })
}


//Auth
// export default function* root(){
//     yield all([
//         takeLatest(ActionTypes.USER_LOGIN_REQUEST, login),
//         takeLatest(ActionTypes.USER_REGISTER_REQUEST, register)
//     ])
// }