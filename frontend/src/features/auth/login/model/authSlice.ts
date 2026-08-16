import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isAuth: (state) => {
            state.isAuth = !state.isAuth;
        },

        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        }
    }
});

export const { setAuth, isAuth } = authSlice.actions;
export default authSlice.reducer;