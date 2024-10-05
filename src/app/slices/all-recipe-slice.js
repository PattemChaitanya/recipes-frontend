import { createSlice } from "@reduxjs/toolkit";
import { recipesApi } from "../api/recipeApi";

const allRecipesSlice = createSlice({
  name: "allRecipes",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(recipesApi.endpoints.getRecipes.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        recipesApi.endpoints.getRecipes.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload.data;
        }
      )
      .addMatcher(
        recipesApi.endpoints.getRecipes.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error;
        }
      );
  },
});

export default allRecipesSlice.reducer;
