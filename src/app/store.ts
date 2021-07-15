import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import authReducer from 'features/slices/authSlice'
import bookReducer from 'features/slices/bookSlice'

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
