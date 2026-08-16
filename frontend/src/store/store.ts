import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/model/themeSlice'
import authReducer from '../features/auth/login/model/authSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch