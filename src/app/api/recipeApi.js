import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3099/api/v1" }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => "recipes",
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApi;
