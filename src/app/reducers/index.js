import { combineReducers } from "@reduxjs/toolkit";

import recipeReducer from "../slices/recipesSlice";
import { recipesApi } from "../api/recipeApi";
import { singleRecipeApi } from "../api/singleRecipe";

const rootReducer = combineReducers({
  recipes: recipeReducer,
  [recipesApi.reducerPath]: recipesApi.reducer,
  [singleRecipeApi.reducerPath]: singleRecipeApi.reducer,
});

export default rootReducer;
