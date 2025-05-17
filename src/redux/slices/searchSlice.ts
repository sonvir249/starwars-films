import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovie } from "../../api/swapi";
import { Movie } from "../../types/movie";
interface SearchState {
  query: string;
  results: Movie | any;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: "",
  loading: false,
  error: null,
};

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults",
  async (query: string) => searchMovie(query)
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
