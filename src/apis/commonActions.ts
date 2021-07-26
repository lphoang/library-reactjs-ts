import { IAppUser, IAuthor, IBook, ICheckout, IGenre, IUser } from './../utils/types/common';
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

export function getInitialAppUserInfo(): IAppUser {
    return {
        age: 0,
        role: "",
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

export function getInitialUserInfo(): IUser {
    return {
        age: 0,
        role: "",
        email: "",
        enabled: false,
        firstName: "",
        id: "",
        lastName: "",
        locked: false,
        password: "",
        username: "",
        checkoutCart: [],
    }
}

export function getInitialBookInfo(): IBook {
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

export function getInitialGenreInfo(): IGenre {
    return {
        id: "",
        title: "",
        books: [],
    }
}

export function getInitialAuthorInfo(): IAuthor {
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
    if (error) {
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
        getBook: (id: string) => instance.get(`/books/${id}`),
        getBookByTitle: (title: string) => instance.get(`/books/search?t=${title}`)
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

function user() {
    return {
        getUserInfo: (token: string, id: string) => instance.get(`/user/info/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        addToCart: (token: string, bookId: string, appUserId: string) => instance.post(`/cart/add`, {
            bookId: bookId,
            appUserId: appUserId,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        removeFromCart: (token: string, bookId: string, appUserId: string) => instance.post(`/cart/remove`, {
            bookId: bookId,
            appUserId: appUserId,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        getCartItems: (token: string, id: string) => instance.get(`/cart/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        getCheckoutCart: (token: string, id: string) => instance.get(`/user/cart/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        checkOut: (request: ICheckout) => instance.post(`/check-out`, {
            orderId: request.orderId,
            paymentType: request.paymentType,
            deliveryAddress: request.deliveryAddress,
        }, {
            headers: { Authorization: `Bearer ${request.token}` }
        })
    }
}

export default function api() {
    return {
        user,
        auth,
        books,
        authors,
        bookGenres
    }
}

