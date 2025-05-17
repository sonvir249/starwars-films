import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchSingleMovie } from "../../api/swapi";
import { MovieState, Movie } from "../../types/movie";

const initialState: MovieState = {
  movie: {},
  status: "idle",
  error: null,
};

export const fetchMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (id: number) => fetchSingleMovie(id)
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.status = "succeeded";
        state.movie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovie.rejected, (state) => {
        state.status = "failed";
        state.error = "An unknown error occurred";
        state.movie = "";
      });
  },
});

export default movieSlice.reducer;
