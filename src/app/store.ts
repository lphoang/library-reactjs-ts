import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
