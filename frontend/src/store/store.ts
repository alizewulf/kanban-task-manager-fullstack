import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/model/themeSlice'
import authReducer from '../features/auth/login/model/authSlice'
import { applyTheme, saveTheme } from "../features/theme/model/themeStorage";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer
    }
})

let synchronizedTheme = store.getState().theme.theme;
applyTheme(synchronizedTheme);
saveTheme(synchronizedTheme);

store.subscribe(() => {
    const theme = store.getState().theme.theme;
    if (theme === synchronizedTheme) {
        return;
    }

    synchronizedTheme = theme;
    saveTheme(theme);
    applyTheme(theme);
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch