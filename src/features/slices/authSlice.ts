import { LoginRequest, RegisterRequest, IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import auth, {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
} from 'apis/commonActions'

import { push } from 'connected-react-router'

const initialState = {
    isLogged: false,
    apiState: getInitialApi(),
    redirectPath: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLogged: (state) => { state.isLogged = true },
        setIsNotLogged: (state) => { state.isLogged = false },
        authLoading: (state) => { state.apiState = getLoading() },
        authDone: (state) => {
            state.apiState = getSuccess(state.apiState);
            state.isLogged = true;
        },
        authError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
            state.isLogged = false;
        },
        setRedirectPath: (state, action: PayloadAction<string>) => {
            state.redirectPath = action.payload;
        }
    }
})

export const authLogin = ({ email, password }: LoginRequest) => (dispatch: any, getState: any) => {
    dispatch(actions.authLoading());
    return auth().login({ email, password })
        .then(() => {
            dispatch(actions.authDone())
            const redirectPath = getState().auth.redirectPath;
            (redirectPath && redirectPath !== '/login')
                ? dispatch(push(getState().auth.redirectPath))
                : dispatch(push('/'));
            dispatch(actions.setRedirectPath(''));
        })
        .catch((error: { response: { data: { error: string } }; message: any }) =>
            dispatch(actions.authError(getErrorMsg(error))))
}

export const authRegister = ({ firstName, lastName, email, password }: RegisterRequest) => (dispatch: any, getState: any) => {
    dispatch(actions.authLoading);
    return auth().register({ firstName, lastName, email, password })
        .then(() => {
            dispatch(actions.authDone())
            const redirectPath = getState().auth.redirectPath;
            (redirectPath && redirectPath !== '/register')
                ? dispatch(push(getState().auth.redirectPath))
                : dispatch(push('/'));
            dispatch(actions.setRedirectPath(''));
        })
        .catch((error: { response: { data: { error: string } }; message: any }) =>
            dispatch(actions.authError(getErrorMsg(error))))
}

export const authCheck = (path: string) => (dispatch: any) => {
    actions.setRedirectPath(path);
}

export const actions = authSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export const selectIsLogged = (state: { auth: { isLogged: boolean; }; }) => state.auth.isLogged;

export const selectCurrentPath = (state: { router: { location: { pathname: string; }; }; }) => state.router.location.pathname;

export default authSlice.reducer;