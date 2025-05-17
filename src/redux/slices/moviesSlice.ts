import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../../api/swapi";
import { Movie, MoviesState } from "../../types/movie";
import { fetchSearchResults } from "./searchSlice";
import { RootState } from "../store";

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  error: null,
};
export const fetchMovies = createAsyncThunk<
  Movie[],
  void,
  { state: RootState }
>("movies/getAllMovies", async () => fetchAllMovies());

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

    // Handle search results using fetchSearchResults
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchSearchResults.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.status = "succeeded";
          state.movies = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchSearchResults.rejected, (state) => {
        state.status = "failed";
        state.error = "An unknown error occurred";
        state.movies = [];
      });
  },
});

export default moviesSlice.reducer;
