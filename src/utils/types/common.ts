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
