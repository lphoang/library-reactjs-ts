import { IBook } from './../../utils/types/common';
import { IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api, {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialBookInfo,
} from 'apis/commonActions'

const initialBooks: IBook[] = [];
const initialState = {
    apiState: getInitialApi(),
    pagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
    },
    books: initialBooks,
    book: getInitialBookInfo(),
}

const bookSlice = createSlice({
    name: 'books',
    initialState: initialState,
    reducers: {
        bookLoading: (state) => { state.apiState = getLoading() },
        booksDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.books = action.payload.data;
            state.pagination.currentPage = action.payload.currentPage;
            state.pagination.totalItems = action.payload.totalItems;
            state.pagination.totalPages = action.payload.totalPages;
        },
        bookDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.book = action.payload;
        },
        bookError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllBooks = (page: number, size: number) => async (dispatch: any) => {
    dispatch(actions.bookLoading);
    try {
        const response = await api().books().getAllBooks(page, size);
        dispatch(actions.booksDone(response.data));
    } catch (error) {
        dispatch(actions.bookError(getErrorMsg(error)));
    }
}

export const getBook = (id: string) => async (dispatch: any) => {
    dispatch(actions.bookLoading);
    try {
        const response = await api().books().getBook(id);
        dispatch(actions.bookDone(response.data));
    } catch (error) {
        dispatch(actions.bookError(getErrorMsg(error)));
    }
}

export const actions = bookSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default bookSlice.reducer;
