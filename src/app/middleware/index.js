import { recipesApi } from "../api/recipeApi";
import { singleRecipeApi } from "../api/singleRecipe";

export const middlewares = [recipesApi.middleware, singleRecipeApi.middleware];
