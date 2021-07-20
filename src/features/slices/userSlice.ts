import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import api, {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialUserInfo,
} from 'apis/commonActions'
import { ICart } from 'utils/types';

const initialCarts: ICart[] = [];
const initialState = {
    apiState: getInitialApi(),
    user: getInitialUserInfo(),
    carts: initialCarts,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userLoading: (state) => { state.apiState = getLoading() },
        userDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.user = action.payload;
        },
        addToCart: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
        },
        removeFromCart: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
        },
        userError: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        },
        getCartItems: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.carts = action.payload;
        }
    }
})

export const getUserInfo = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.userLoading);
    try {
        const response = await api().user().getUserInfo(token, id);
        dispatch(actions.userDone(response.data));
    } catch (error) {
        dispatch(actions.userError(getErrorMsg(error)));
    }
}

export const addToCart = (token: string, bookId: string, appUserId: string) => async (dispatch: any) => {
    dispatch(actions.userLoading);
    try {
        const response = await api().user().addToCart(token, bookId, appUserId);
        dispatch(actions.addToCart(response.data));
    } catch (error) {
        dispatch(actions.userError(getErrorMsg(error)));
    }
}

export const removeFromCart = (token: string, bookId: string, appUserId: string) => async (dispatch: any) => {
    dispatch(actions.userLoading);
    try {
        const response = await api().user().removeFromCart(token, bookId, appUserId);
        dispatch(actions.removeFromCart(response.data));
    } catch (error) {
        dispatch(actions.userError(getErrorMsg(error)));
    }
}

export const getCartItems = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.userLoading);
    try {
        const response = await api().user().getCartItems(token, id);
        dispatch(actions.getCartItems(response.data));
    } catch (error) {
        dispatch(actions.userError(getErrorMsg(error)));
    }
}

export const actions = userSlice.actions;

export const selectApiState = (state: any) => state.auth.apiState;

export default userSlice.reducer;