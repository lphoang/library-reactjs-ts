import { rootReducer } from './../features/rootReducer';
import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import { loadState, saveState } from './stateLs';

const sagaMiddleware = createSagaMiddleware();
const persistedStore = loadState();

export const store = configureStore({
  preloadedState: persistedStore,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
