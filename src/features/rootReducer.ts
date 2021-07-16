import authReducer from 'features/slices/authSlice'
import bookReducer from 'features/slices/bookSlice'
import authorReducer from 'features/slices/authorSlice'
import genreReducer from 'features/slices/genreSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    auth: authReducer,
    books: bookReducer,
    authors: authorReducer,
    genres: genreReducer
})