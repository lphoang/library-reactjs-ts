import { IAppUser } from './../utils/types/common';
import axios from 'axios';
import { IApiState, LoginRequest, RegisterRequest } from 'utils/types';

export function getLoading(): IApiState {
    return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    };
}

export function getInitialUserInfo(): IAppUser {
    return {
        accountNonExpired: true,
        accountNonLocked: true,
        age: 0,
        appUserRole: "USER",
        authorities: [{ authority: "USER" }],
        credentialsNonExpired: true,
        email: "",
        enabled: false,
        firstName: "",
        id: "",
        lastName: "",
        locked: false,
        password: "",
        username: "",
    }
}

export function getInitialApi(): IApiState {
    return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    };
}

export function getSuccess(apiState: IApiState): IApiState {
    apiState.isError = false;
    apiState.errorMessage = '';
    apiState.isSuccess = true;
    apiState.isLoading = false;
    return { ...apiState };
}

export function getError(apiState: IApiState, errorMessage: string): IApiState {
    apiState.isSuccess = false;
    apiState.isLoading = false;
    apiState.isError = true;
    apiState.errorMessage = errorMessage;
    return { ...apiState }
}

export function getErrorMsg(error : any) {
    let errMsg = '';
    if (error.response) {
        errMsg = error.response.data.message;
    } else {
        errMsg = `Something wrong happened! ${error.message}`;
    }
    return errMsg;
}

export const instance = axios.create({
    baseURL: "https://library-springboot-postgresql.herokuapp.com",
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default function auth() {
    return {
        register: (request: RegisterRequest): any => instance.post('/user/register', request),
        login: (request: LoginRequest): any => instance.post('/user/login', request),
    }
}