import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "../../types/movie";

const initialState: ThemeState =
  (localStorage.getItem("theme") as ThemeState) || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
    setTheme: (_, action: PayloadAction<ThemeState>) => {
      localStorage.setItem("theme", action.payload);
      return action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
