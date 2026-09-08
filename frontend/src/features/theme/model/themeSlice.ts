import { createSlice } from "@reduxjs/toolkit";
import { getStoredTheme, saveTheme, applyTheme, type Theme } from "../mode/themeStorage";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: getStoredTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveTheme(state.theme);
      applyTheme(state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      saveTheme(state.theme);
      applyTheme(state.theme);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;