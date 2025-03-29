import { createSlice } from "@reduxjs/toolkit";
import { recipesApi } from "../api/recipeApi";

const allRecipesSlice = createSlice({
  name: "allRecipes",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(recipesApi.endpoints.getRecipes.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        recipesApi.endpoints.getRecipes.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          // Handle different response formats
          if (action.payload && action.payload.data) {
            // If response has a data property
            const responseData = action.payload.data;
            state.data = Array.isArray(responseData) 
              ? responseData 
              : Object.values(responseData);
          } else {
            // If response is directly the data array or object
            state.data = Array.isArray(action.payload) 
              ? action.payload 
              : Object.values(action.payload || {});
          }
        }
      )
      .addMatcher(
        recipesApi.endpoints.getRecipes.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error;
          state.data = [];
        }
      );
  },
});

export default allRecipesSlice.reducer;
