import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "./api/recipeApi";
import { singleRecipeApi } from "./api/singleRecipe";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(recipesApi.middleware, singleRecipeApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
