import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { omdbSearchMovie } from "../../api/swapi";

import {
  OmdbMovieSearch,
  OmdbSearchParams,
  OmdbSearchResultState,
} from "../../types/movie";

const initialState: OmdbSearchResultState = {
  Search: null,
  omdbStatus: "idle",
  omdbError: null,
};

export const fetchOmdbMovie = createAsyncThunk(
  "movies/getOmdbMovie",
  async ({ title, year }: OmdbSearchParams) => omdbSearchMovie(title, year)
);

const omdbMovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOmdbMovie.pending, (state) => {
        state.omdbStatus = "loading";
        state.omdbError = null;
      })
      .addCase(
        fetchOmdbMovie.fulfilled,
        (state, action: PayloadAction<OmdbMovieSearch>) => {
          state.omdbStatus = "succeeded";
          state.Search = action.payload;
          state.omdbError = null;
        }
      )
      .addCase(fetchOmdbMovie.rejected, (state) => {
        state.omdbStatus = "failed";
        state.omdbError = "An unknown error occurred";
        state.Search = null;
      });
  },
});

export default omdbMovieSlice.reducer;
