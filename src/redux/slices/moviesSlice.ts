import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllMovies } from "../../api/swapi";
import { Movie, MoviesState, SortField } from "../../types/movie";
import { fetchSearchResults } from "./searchSlice";
import { RootState } from "../store";

const initialState: MoviesState = {
  movies: [],
  sortedMovies: [],
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
  reducers: {
    sortMovies: (state, action) => {
      const sortBy: SortField = action.payload;

      let sortedMovies: Movie[] = state.movies;

      if (sortBy === "episode_id") {
        sortedMovies = state.movies.sort(
          (a: Movie, b: Movie) => a.episode_id - b.episode_id
        );
      }

      if (sortBy === "title" || sortBy === "release_date") {
        sortedMovies = state.movies.sort((a: Movie, b: Movie) =>
          a[sortBy].localeCompare(b[sortBy])
        );
      }

      state.sortedMovies = sortedMovies;
    },
  },
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
          state.sortedMovies = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
        state.movies = [];
        state.error = "An unknown error occurred";
      });

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
          state.sortedMovies = action.payload;
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

export const { sortMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
