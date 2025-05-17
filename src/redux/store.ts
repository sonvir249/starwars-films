import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import movieReducer from "./slices/movieSlice";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movie: movieReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
