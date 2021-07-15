import { IAppUser } from './../../utils/types/common';
import { LoginRequest, RegisterRequest, IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api, {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialUserInfo,
} from 'apis/commonActions'

const initialState = {
    isLogged: false,
    apiState: getInitialApi(),
    user: getInitialUserInfo(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLogged: (state) => { state.isLogged = true },
        setIsNotLogged: (state) => { state.isLogged = false },
        authLoading: (state) => { state.apiState = getLoading() },
        authDone: (state, action: PayloadAction<IAppUser>) => {
            state.apiState = getSuccess(state.apiState);
            state.user = action.payload;
            state.isLogged = state.user.enabled;
        },
        authError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
            state.isLogged = false;
        }
    }
})

export const authLogin = ({ email, password }: LoginRequest) => (dispatch: any) => {
    dispatch(actions.authLoading());
    return api().auth().login({ email, password })
        .then((response: any) => {
            dispatch(actions.authDone(response.data.user))
        })
        .catch((error: any) => {
            dispatch(actions.authError(getErrorMsg(error)))
        })
}

export const authRegister = ({ firstName, lastName, age, email, password }: RegisterRequest) => (dispatch: any) => {
    dispatch(actions.authLoading);
    return api().auth().register({ firstName, lastName, age, email, password })
        .then((response: any) => {
            dispatch(actions.authDone(response.data.user))
        })
        .catch((error: any) => {
            dispatch(actions.authError(getErrorMsg(error)))
        })
}

export const actions = authSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export const selectIsLogged = (state: { auth: { isLogged: boolean; }; }) => state.auth.isLogged;

export default authSlice.reducer;