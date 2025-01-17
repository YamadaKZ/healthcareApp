import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import postReducer from "./features/post/postSlice";
import bmrReducer from "./features/bmr/bmrSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        bmr: bmrReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export type AppDispatch = typeof store.dispatch;
