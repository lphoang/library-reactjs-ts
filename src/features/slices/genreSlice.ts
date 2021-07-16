import { IGenre } from './../../utils/types/common';
import { IApiState } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api, {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialGenreInfo,
} from 'apis/commonActions'

const initialGenres: IGenre[] = [];
const initialState = {
    apiState: getInitialApi(),
    genres: initialGenres,
    genre: getInitialGenreInfo(),
}

const genreSlice = createSlice({
    name: 'genres',
    initialState: initialState,
    reducers: {
        genreLoading: (state) => { state.apiState = getLoading() },
        genresDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.genres = action.payload;
        },
        genreDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.genre = action.payload;
        },
        genreError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllGenres = () => async (dispatch: any) => {
    dispatch(actions.genreLoading);
    try {
        const response = await api().bookGenres().getAllGenres();
        dispatch(actions.genresDone(response.data));
    } catch (error) {
        dispatch(actions.genreError(getErrorMsg(error)));
    }
}

export const getGenre = (id: string) => async (dispatch: any) => {
    dispatch(actions.genreLoading);
    try {
        const response = await api().bookGenres().getGenre(id);
        dispatch(actions.genreDone(response.data));
    } catch (error) {
        dispatch(actions.genreError(getErrorMsg(error)));
    }
}

export const actions = genreSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default genreSlice.reducer;