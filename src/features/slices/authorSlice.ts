import { IAuthor } from './../../utils/types/common';
import { IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api, {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialAuthorInfo,
} from 'apis/commonActions'

const initialAuthors: IAuthor[] = [];
const initialState = {
    apiState: getInitialApi(),
    authors: initialAuthors,
    author: getInitialAuthorInfo(),
}

const authorSlice = createSlice({
    name: 'authors',
    initialState: initialState,
    reducers: {
        authorLoading: (state) => { state.apiState = getLoading() },
        authorsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.authors = action.payload;
        },
        authorDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.author = action.payload;
        },
        authorError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllAuthors = () => async (dispatch: any) => {
    dispatch(actions.authorLoading);
    try {
        const response = await api().authors().getAllAuthors();
        dispatch(actions.authorsDone(response.data));
    } catch (error) {
        dispatch(actions.authorError(getErrorMsg(error)));
    }
}

export const getAuthor = (id: string) => async (dispatch: any) => {
    dispatch(actions.authorLoading);
    try {
        const response = await api().authors().getAuthor(id);
        dispatch(actions.authorDone(response.data));
    } catch (error) {
        dispatch(actions.authorError(getErrorMsg(error)));
    }
}

export const actions = authorSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default authorSlice.reducer;