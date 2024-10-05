import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const singleRecipeApi = createApi({
  reducerPath: "singleRecipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://us-central1-fourth-way-435809-a7.cloudfunctions.net/recipeApi/api/v1",
  }),
  endpoints: (builder) => ({
    getRecipeById: builder.query({
      query: (id) => `recipe/${id}`,
    }),
    addRecipe: builder.mutation({
      query: (newRecipe) => ({
        url: "recipe",
        method: "POST",
        body: newRecipe,
      }),
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...updatedRecipe }) => ({
        url: `recipe/${id}`,
        method: "PUT",
        body: updatedRecipe,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `recipe/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRecipeByIdQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = singleRecipeApi;
