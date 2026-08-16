import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getAuthStorageState, setAuthStorageState } from "./authStorage";

interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: getAuthStorageState()
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isAuth: (state) => {
            state.isAuth = !state.isAuth;
        },

        setAuth: (state, action: PayloadAction<boolean | { isAuth: boolean; rememberMe?: boolean }>) => {
            const isAuthValue = typeof action.payload === "boolean" ? action.payload : action.payload.isAuth;
            const rememberMe = typeof action.payload === "boolean" ? true : action.payload.rememberMe;

            state.isAuth = isAuthValue;

            if (isAuthValue && rememberMe) {
                setAuthStorageState(true);
                return;
            }

            setAuthStorageState(false);
        }
    }
});

export const { setAuth, isAuth } = authSlice.actions;
export default authSlice.reducer;