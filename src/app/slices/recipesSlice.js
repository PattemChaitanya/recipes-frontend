import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  recipesToLimit: [],
  status: "idle",
  error: null,
  singleRecipe: null,
  singleError: null,
  singleStatus: "loading",
  open: false,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSingleRecipe: (state, action) => {
      const id = action.payload;
      state.singleRecipe = state.recipes.find((recipe) => recipe.id === id);
    },
    handleSearchModal: (state, action) => {
      state.open = !state.open;
    },
    updateRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    updateRecipesToLimit: (state, action) => {
      state.recipesToLimit = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.isLoading ? "loading" : null;
    },
    updateError: (state, action) => {
      state.error = action.isLoading;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSingleRecipe,
  handleSearchModal,
  updateRecipes,
  updateRecipesToLimit,
  updateStatus,
  updateError,
} = recipesSlice.actions;
export default recipesSlice.reducer;
