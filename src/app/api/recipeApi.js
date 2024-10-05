import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://us-central1-fourth-way-435809-a7.cloudfunctions.net/recipeApi/api/v1",
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => "recipes",
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApi;
