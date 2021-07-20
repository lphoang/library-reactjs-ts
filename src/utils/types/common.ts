export interface Status {
    ERROR: 'error';
    IDLE: 'idle';
    RUNNING: 'running';
    SUCCESS: 'success';
}

export interface NavMenu {
    name: string,
    url: string,
    className: string,
}

export interface IApiState {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string
}

export interface RegisterRequest {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface ICart {
    book: IBook,
    createdAd: string,
    id: string,
}

export interface IUser {
    age: number,
    role: string,
    email: string,
    enabled: boolean,
    firstName: string,
    id: string,
    lastName: string,
    locked: boolean,
    password: string,
    username: string,
    carts: ICart[],
}
export interface IAppUser {
    age: number,
    role: string,
    email: string,
    enabled: boolean,
    firstName: string,
    id: string,
    lastName: string,
    locked: boolean,
    password: string,
    username: string,
}

export interface IBook {
    id: string,
    title: string,
    bookGenre: {
        id: string,
        title: string,
    },
    author: {
        id: string,
        fullName: string,
    },
    description: string,
    releaseDate: string,
    price: number,
    score: number,
    thumbnail: string,
}

export interface IAuthor {
    id: string,
    fullName: string,
    books: IBook[],
}

export interface IGenre {
    id: string,
    title: string,
    books: IBook[],
}