import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../../entities/users/interface";
import {
    getAuthStorageState,
    getAuthStorageUser,
    setAuthStorageState,
    setAuthStorageUser,
} from "./authStorage";

interface AuthState {
    isAuth: boolean;
    user: Pick<User, "id" | "login"> | null;
}

const initialState: AuthState = {
    isAuth: getAuthStorageState(),
    user: getAuthStorageUser(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        isAuth: (state) => {
            state.isAuth = !state.isAuth;
        },

        setAuth: (state, action: PayloadAction<boolean | { isAuth: boolean; user?: User; rememberMe?: boolean }>) => {
            const isAuthValue = typeof action.payload === "boolean" ? action.payload : action.payload.isAuth;
            const rememberMe = typeof action.payload === "boolean" ? true : action.payload.rememberMe;
            const authenticatedUser = typeof action.payload === "boolean" ? state.user : action.payload.user ?? null;
            const user = authenticatedUser
                ? { id: authenticatedUser.id, login: authenticatedUser.login }
                : null;

            state.isAuth = isAuthValue;
            state.user = isAuthValue ? user : null;

            if (isAuthValue && rememberMe) {
                setAuthStorageState(true);
                setAuthStorageUser(user);
                return;
            }

            setAuthStorageState(false);
            setAuthStorageUser(null);
        }
    }
});

export const { setAuth, isAuth } = authSlice.actions;
export default authSlice.reducer;