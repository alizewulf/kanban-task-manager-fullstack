import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../../entities/users/interface";

interface AuthState {
    isAuth: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuth: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ user: User } | false>) => {
            if (action.payload === false) {
                state.isAuth = false;
                state.user = null;
                return;
            }

            state.isAuth = true;
            state.user = action.payload.user;
        },
        updateAuthUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    }
});

export const { setAuth, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;