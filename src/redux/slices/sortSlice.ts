// features/sort/sortSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortField, SortState } from "../../types/movie";

const initialState: SortState = {
  field: "defalut",
  ascending: true,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortField(state, action: PayloadAction<SortField>) {
      if (state.field === action.payload) {
        state.ascending = !state.ascending;
      } else {
        state.field = action.payload;
        state.ascending = true;
      }
    },
  },
});

export const { setSortField } = sortSlice.actions;
export default sortSlice.reducer;
