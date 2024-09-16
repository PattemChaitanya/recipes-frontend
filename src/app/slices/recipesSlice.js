import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const initialState = {
  recipes: [],
  status: "idle",
  error: null,
  singleRecipe: null,
  singleError: null,
  singleStatus: "idle",
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return recipesList.filter((item) => item.description.length !== 0);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleRecipes = createAsyncThunk(
  "recipes/fetchSingleRecipe",
  async (id, { rejectWithValue }) => {
    try {
      const docSnap = await getDoc(doc(db, "recipes", id));

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Recipe does not exist");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSingleRecipe: (state, action) => {
      const id = action.payload;
      state.singleRecipe = state.recipes.find((recipe) => recipe.id === id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSingleRecipes.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchSingleRecipes.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        state.singleRecipe = action.payload;
      })
      .addCase(fetchSingleRecipes.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.singleError = action.payload;
      });
  },
});

export const { setSingleRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;
