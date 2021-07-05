import axios from 'axios';


export function getLoading(){
    return{
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    };
}

export function getInit(){
    return{
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    };
}

export function getSuccess(state: { isSuccess: boolean; isLoading: boolean; }){
    state.isSuccess = true;
    state.isLoading = false;
    return {...state};
}

export function getError(state: { isSuccess: boolean; isLoading: boolean; isError: boolean; errorMessage: string }, errorMessage: string){
    state.isSuccess = false;
    state.isLoading = false;
    state.isError = true;
    state.errorMessage = errorMessage;
    return {...state}
}

export function getErrorMsg(error: { response: { data: { error: string; }; }; message: any; }){
    let errMsg = '';
    if(error.response){
        errMsg = error.response.data.error;
    }else{
        errMsg = `Something wrong happened! ${error.message}`;
    }
    return errMsg;
}

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})
