import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../../api/swapi";
import { Movie, MoviesState } from "../../types/movie";

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  error: null,
};
export const fetchMovies = createAsyncThunk<
  Movie[],
  void,
  { rejectValue: string }
>("movies/getAllMovies", fetchAllMovies);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.movies = action.payload;
          state.error = null;
        }
      )
      .addCase(
        fetchMovies.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "An unknown error occurred";
          state.movies = [];
        }
      );
  },
});

export default moviesSlice.reducer;
