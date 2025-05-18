import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import searchReducer from "./slices/searchSlice";
import sortReducer from "./slices/sortSlice";
import themeReducer from "./slices/themeSlice";
import omdbMovieReducer from "./slices/omdbMovieSlice";

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  movies: moviesReducer,
  search: searchReducer,
  sort: sortReducer,
  theme: themeReducer,
  omdbMovie: omdbMovieReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
