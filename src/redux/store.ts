import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import movieReducer from "./slices/movieSlice";
import searchReducer from "./slices/searchSlice";
import sortReducer from "./slices/sortSlice";
import themeReducer from "./slices/themeSlice";
import omdbMovieReducer from "./slices/omdbMovieSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movie: movieReducer,
    search: searchReducer,
    sort: sortReducer,
    theme: themeReducer,
    omdbMovie: omdbMovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
