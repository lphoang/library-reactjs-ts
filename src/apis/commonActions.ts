import { IAppUser, IBook } from './../utils/types/common';
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
        age: 0,
        role: "USER",
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

export function getInitialBookInfo() : IBook {
    return {
        id: "",
        title: "",
        bookGenre: "",
        author: "",
        releaseDate: "",
        price: 0,
        score: 0,
        thumbnail: "",
        description: ""
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

export function getErrorMsg(error: any) {
    let errMsg = '';
    if (error.response) {
        errMsg = error.response.data.message;
    } else {
        errMsg = `Something wrong happened! ${error.message}`;
    }
    return errMsg;
}

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})

function auth() {
    return {
        register: (request: RegisterRequest): any => instance.post('/user/register', request),
        login: (request: LoginRequest): any => instance.post('/user/login', request),
    }
}

function books() {
    return {
        getAllBooks: () => instance.get('/books'),
        getBook: (id: string) => instance.get(`/books/${id}`)
    }
}

export default function api() {
    return {
        auth,
        books,
    }
}

