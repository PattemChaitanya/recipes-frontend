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
      transformResponse: (response) => {
        // Handle possible null or undefined response
        if (!response) return [];
        
        // Handle nested data structure (common in Firebase responses)
        const data = response.data || response;
        
        // Convert object to array if needed
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          return Object.values(data);
        }
        
        return data;
      },
    }),
  }),
});

export const { useGetRecipesQuery } = recipesApi;
