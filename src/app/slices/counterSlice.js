import { createSlice } from "@reduxjs/toolkit";

export const singleRecipeSlice = createSlice({
  name: "counter",
  initialState: {
    recipe: null,
    error: null,
    status: "idle",
  },
  reducers: {
    getRecipe: (state, action) => {
      state.recipe = action.payload;
      state.status = "idle";
    },
    getRecipeError: (state, action) => {
      state.error = action.payload;
      state.status = "idle";
    },
    getRecipeLoading: (state, action) => {
      state.status = "loading";
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  singleRecipeSlice.actions;

export default singleRecipeSlice.reducer;
