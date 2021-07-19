import { IAppUser, IAuthor, IBook, IGenre } from './../utils/types/common';
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
        bookGenre: {
            id: "",
            title: ""
        },
        author: {
            id: "",
            fullName: "",
        },
        releaseDate: "",
        price: 0,
        score: 0,
        thumbnail: "",
        description: ""
    }
}

export function getInitialGenreInfo() : IGenre {
    return {
        id: "",
        title: "",
        books: [],
    }
}

export function getInitialAuthorInfo() : IAuthor {
    return {
        id: "",
        fullName: "",
        books: [],
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
        getAllBooks: (page: number, size: number) => instance.get(`/books?page=${page}&size=${size}`),
        getBook: (id: string) => instance.get(`/books/${id}`)
    }
}

function authors() {
    return {
        getAllAuthors: () => instance.get('/authors'),
        getAuthor: (id: string) => instance.get(`/authors/${id}`)
    }
}

function bookGenres() {
    return {
        getAllGenres: () => instance.get('/genres'),
        getGenre: (id: string) => instance.get(`/genres/${id}`)
    }
}

export default function api() {
    return {
        auth,
        books,
        authors,
        bookGenres
    }
}

